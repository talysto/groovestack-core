# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class OmniAuth < Groovestack::Auth::Provider
        BASE_PATH = '/users/auth'

        def self.required_credentials
          const_defined?(:REQUIRED_CREDENTIALS) ? self::REQUIRED_CREDENTIALS : []
        end

        def self.required_credentials_present?
          required_credentials.all? { |credential| credential_for(credential).present? }
        end

        def self.configured?
          required_credentials_present?
        end

        def self.generate_omniauth_args
          # different providers require different arguments
          [
            provider,
            *required_credentials.map { |credential| credential_for(credential) }
          ]
        end

        def self.path
          "#{BASE_PATH}/#{k}"
        end

        def self.as_json(keys = nil)
          verbose = super.merge({
                                  required_credentials: required_credentials,
                                  path: path,
                                  generate_omniauth_args: generate_omniauth_args
                                })

          return verbose if keys.nil?

          verbose.slice(*keys)
        end
      end
    end
  end
end
