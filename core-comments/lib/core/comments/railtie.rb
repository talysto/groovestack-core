# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Comments
      class Railtie < Rails::Engine
        # Enable our new migrations for the parent app
        initializer :append_migrations do |app|
          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            config.paths['db/migrate'].expanded.each do |expanded_path|
              app.config.paths['db/migrate'] << expanded_path
            end
          end
        end

        # Enable our new initializers for the parent app
        initializer :append_initializers do |app|
          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            config.paths['config/initializers'].expanded.each do |expanded_path|
              app.config.paths['config/initializers'] << expanded_path
            end
          end
        end

        config.after_initialize do
          if (ENV['RAILS_ENV'] || ENV.fetch('RACK_ENV', nil)) == 'development'
            validations = [
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

            puts 'CORE Platform DX Mode'.bold

            errors = []
            validations.each do |v|
              v[:eval].call
            rescue StandardError
              errors << v[:message]
              break
            end

            if errors.length.positive?
              print '⚠️'.brown
              puts "  CORE::Comments\t#{Core::Comments::VERSION}\t#{errors[0]}"
            else
              print '✔'.green
              puts "  CORE::Comments\t#{Core::Comments::VERSION}"
            end
          end
        end
      end
    end
  end
end
