# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Notifications
      class Railtie < Rails::Engine
        include ::Core::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Core::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
          ]
        end

        initializer :append_migrations do |app|
          append_migrations app
        end

        config.after_initialize do
          after_init
        end
      end
    end
  end
end
