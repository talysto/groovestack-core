# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Auth
      class Railtie < Rails::Engine
        include ::Core::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Core::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
            {
              eval: proc { raise unless defined?(::Core::Config) },
              message: "Error: 'core-config' gem is required, add it your your gemfile"
            },
            {
              eval: proc { raise unless (app_config = ::Core::Config::App.generate_config) && ((app_config.keys.include?(:oauth_enabled) && !app_config[:oauth_enabled]) || ::Core::Auth::Providers::OmniAuth.enabled_providers.present? ) },
              message: "Warning: oauth is enabled but no providers are configured. Follow the instructions in the README to configure oauth providers or disable oauth in the groovestack initializer."
            }
          ]
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
