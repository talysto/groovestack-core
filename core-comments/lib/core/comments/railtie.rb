# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Comments
      class Railtie < Rails::Engine
        include ::Core::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Core::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
            {
              eval: proc do
                      unless Rails.application.config.active_record.schema_format == :sql
                        raise Core::Comments::WrongSchemaFormat
                      end
                    end,
              message: 'Error: Must change your schema format to :sql'
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
