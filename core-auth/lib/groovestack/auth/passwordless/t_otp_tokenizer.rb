# frozen_string_literal: true

require 'rotp'
# require 'base32'  # You can use any Base32 encoder

module Groovestack
  module Auth
    module Passwordless
      module TOtpTokenizer
        module_function

        # Validity period (in seconds)
        def token_validity_seconds
          Devise.passwordless_login_within.seconds
        end

        # Generate a TOTP instance for the resource.
        #
        # We derive a per‑resource secret from a combination of the resource’s id and Rails’ secret.
        def totp_for(resource, digits: 4, interval: token_validity_seconds)
          # add last sign in at to prevent same otp being generated multiple times
          identifier = resource.id
          identifier += ":#{resource.current_sign_in_at.to_i}" if resource.current_sign_in_at.present?

          raw_secret = OpenSSL::HMAC.digest('sha1', Rails.application.secret_key_base, identifier)
          base32_secret = ROTP::Base32.encode raw_secret

          # Create a TOTP object configured for 4 digits and the given time interval.
          ROTP::TOTP.new(base32_secret, digits: digits, interval: interval)
        end

        # Generates the token for the current time window.
        def encode(resource, _extra: nil, _expires_at: nil)
          # otp = totp_for(resource).now

          # otp_as_formatted_code(otp)
          totp_for(resource).now
        end

        # Verifies that the provided token is valid (i.e. within the current time window).
        #
        # Since the token is time‐dependent, expiration is enforced by the TOTP algorithm.
        def decode(code, email, resource_class, _as_of: nil, _expire_duration: nil)
          raise ::Devise::Passwordless::InvalidTokenError if code.blank?

          # For TOTP, we look up the resource and then verify the code.
          # Note: How you locate the resource is up to your application.
          # For example, if your code is combined with an email or user id in the URL, you would look it up there.
          #
          resource = resource_class.find_by(email: email)

          raise 'Resource not found' if resource.blank?

          # # Remove the hyphen to get the plain digits.
          # otp = otp_from_formatted_code(code)
          otp = code

          verify_opts = {}
          # by default, ROTP is fixed window interval. This code enables a sliding window
          now = Time.zone.now
          verify_opts[:at] = now
          verify_opts[:drift_behind] = token_validity_seconds / 2 # (now.sec % token_validity_seconds) - 1
          if resource_class.passwordless_expire_old_tokens_on_sign_in && resource.current_sign_in_at.present?
            # support login / logout / login again within same token validity period
            verify_opts[:after] = (resource.current_sign_in_at - token_validity_seconds).to_i
          end
          # end sliding window logic
          decrypted_data = totp_for(resource).verify(otp, **verify_opts)

          raise ::Devise::Passwordless::InvalidOrExpiredTokenError if decrypted_data.blank?

          [resource, { data: decrypted_data }]
        end

        # # Helper: Formats an 4‑digit code as "xxxx".
        # def otp_as_formatted_code(otp)
        #   otp = otp.to_s
        #   code = otp.length == 4 ? otp.dup.insert(2, '-') : otp
        #   code
        # end

        # def otp_from_formatted_code(formatted_code)
        #   otp = formatted_code.delete('-')
        #   otp
        # end
      end
    end
  end
end
