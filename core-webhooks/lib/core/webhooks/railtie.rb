# frozen_string_literal: true

require_relative 'handler'

if defined?(Rails)
  module Core
    module Webhooks
      class Railtie < ::Rails::Engine
        include ::Core::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Core::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
            {
              eval: proc { 
                raise if ::Core::Webhooks.enabled_handlers_sans_configuration.present? 
              },
              message: "\n\tWarning: enabled handlers are missing required credentials:\n\t\t#{::Core::Webhooks.enabled_handlers_sans_configuration.map { |h| "#{h.provider.titleize} - #{h.required_credentials.join(', ')}" }.join("\n\t\t")}\n\tAdd them to your credentials file or disable the handlers by adding them to Core::Webhooks.disabled_handlers."
            }
          ]
        end

        def module_description
          "\n\tAvailable webhook handlers: #{::Core::Webhooks.available_handlers.map(&:provider).map(&:titleize).join(', ')}\n\tEnabled webhook handlers: #{::Core::Webhooks.enabled_handlers.map(&:provider).map(&:titleize).join(', ')}"
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
