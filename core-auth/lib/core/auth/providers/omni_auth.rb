module Core
  module Auth
    module Providers
      class OmniAuth < Core::Auth::Provider
        BASE_PATH = '/users/auth'.freeze

        def self.required_credentials
          self.const_defined?(:REQUIRED_CREDENTIALS) ? self::REQUIRED_CREDENTIALS : []
        end

        def self.required_credentials_present?
          required_credentials.all? { |credential| Rails.application.credentials.send(credential).present? }
        end

        def self.configured?
          required_credentials_present?
        end

        def self.generate_omniauth_args 
          # different providers require different arguments
          [
            provider, 
            *required_credentials.map { |c| Rails.application.credentials.send(c) },
          ]
        end

        def self.path
          "#{BASE_PATH}/#{k}"
        end

        def self.as_json(keys=nil)
          verbose = super.merge({
            required_credentials: required_credentials,
            path: path,
            generate_omniauth_args: generate_omniauth_args
          })
  
          return verbose if keys.nil?
  
          verbose.select { |k, v| keys.include?(k) }
        end
      end
    end
  end
end