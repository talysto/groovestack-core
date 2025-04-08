# frozen_string_literal: true

if defined?(Rails)
  module Groovestack
    module Config
      class Railtie < Rails::Engine
        include ::Groovestack::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Groovestack::Base) },
              message: "Error: 'groovestack-base' gem is required, add it your your gemfile"
            },
          ]
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
