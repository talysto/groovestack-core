# frozen_string_literal: true

require_relative 'provider'

if defined?(Rails)
  module Groovestack
    module Auth
      class Railtie < ::Rails::Engine
        include ::Groovestack::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Groovestack::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
            {
              eval: proc { raise unless defined?(::Core::Config) },
              message: "Error: 'core-config' gem is required, add it your your gemfile"
            },
            # {
            #   eval: proc { raise unless (app_config = ::Core::Config::App.generate_config) && ((app_config.keys.include?(:oauth_enabled) && !app_config[:oauth_enabled]) || ::Groovestack::Auth::Providers::OmniAuth.enabled_providers.present? ) },
            #   message: "Warning: oauth is enabled but no providers are configured. Follow the instructions in the README to configure oauth providers or disable oauth in the groovestack initializer."
            # }
            {
              eval: proc {
                raise if ::Groovestack::Auth.enabled_providers_sans_configuration.present?
              },
              message: "\n\tWarning: enabled providers are missing required credentials:\n\t\t#{::Groovestack::Auth.enabled_providers_sans_configuration.map do |h|
                "#{h.provider.to_s.titleize} - #{h.required_credentials.join(', ')}"
              end.join("\n\t\t")}\n\tAdd them to your credentials file or disable the providers by adding them to Groovestack::Auth.disabled_providers."
            }
          ]
        end

        def module_description
          "\n\tAvailable auth providers: #{::Groovestack::Auth.available_providers.map(&:k).map(&:to_s).map(&:titleize).join(', ')}\n\tEnabled auth providers: #{::Groovestack::Auth.enabled_providers.map(&:k).map(&:to_s).map(&:titleize).join(', ')}"
        end

        initializer :append_migrations do |app|
          append_migrations app
        end

        initializer :append_initializers do |app|
          append_initializers app
        end

        config.after_initialize do
          after_init
        end
      end
    end
  end
end
