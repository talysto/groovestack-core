# frozen_string_literal: true

if defined?(Rails)
  module Groovestack
    module Identities
      class Railtie < ::Rails::Engine
        include ::Groovestack::Base::CoreRailtie

        def dx_validations
          []
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
