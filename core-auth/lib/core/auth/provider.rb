module Core
  module Auth 
    class Provider 
      def self.provider
        self.const_defined?(:PROVIDER) ? self::PROVIDER : nil
      end

      def self.k
        self.const_defined?(:K) ? self::K : provider
      end

      def self.available?
        provider.present?
      end

      def self.available_providers
        self.descendants.select(&:available?)
      end

      def self.enabled 
        self.const_defined?(:ENABLED) ? self::ENABLED : false
      end

      def self.enabled?
        (::Core::Auth::Provider.available_providers & self.ancestors).any?(&:enabled)
      end

      def self.enabled_providers 
        available_providers.select(&:enabled?)
      end

      def self.as_json(keys=nil)
        verbose = {
          provider: provider,
          k: k || provider,
        }

        return verbose if keys.nil?

        verbose.select { |k, v| keys.include?(k) }
      end
    end
  end
end

module Core
  module Auth
    module Providers
      class Email < Core::Auth::Provider
        PROVIDER = :email
        ENABLED = true # TODO allow this to be disabled
      end

      class OmniAuth < Core::Auth::Provider
        BASE_PATH = '/users/auth'.freeze

        def self.required_credentials
          self.const_defined?(:REQUIRED_CREDENTIALS) ? self::REQUIRED_CREDENTIALS : []
        end

        def self.required_credentials_present?
          required_credentials.all? { |credential| Rails.application.credentials.send(credential).present? }
        end

        def self.enabled 
          available? && required_credentials_present?
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

      class Google < OmniAuth
        PROVIDER = :google_oauth2
        K = :google
        REQUIRED_CREDENTIALS = [:GOOGLE_CLIENT_ID, :GOOGLE_CLIENT_SECRET]

        def self.generate_omniauth_args 
          super << { name: k }
        end
      end

      class Apple < OmniAuth
        PROVIDER = :apple
        REQUIRED_CREDENTIALS = [:APPLE_CLIENT_ID, :APPLE_TEAM_ID, :APPLE_KEY_ID, :APPLE_PEM_CONTENT]

        def self.generate_omniauth_args 
          [
            provider,
            Rails.application.credentials.APPLE_CLIENT_ID,
            '',
            {
              team_id: Rails.application.credentials.APPLE_TEAM_ID,
              key_id: Rails.application.credentials.APPLE_KEY_ID,
              pem: Rails.application.credentials.APPLE_PEM_CONTENT,
            }
          ]
        end
      end
    end
  end
end