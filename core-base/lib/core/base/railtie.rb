# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Base
      module CoreRailtie
        extend ActiveSupport::Concern

        CORE_ENGINE = true

        included do 
          def dx_validations
            []
          end

          def module_name
            self.class.name.deconstantize.demodulize
          end

          def module_version
            self.class.name.deconstantize.constantize::VERSION
          end

          def after_init 
            if Rails.const_defined?("Console") && (ENV['RAILS_ENV'] || ENV.fetch('RACK_ENV', nil)) == 'development'
              puts 'CORE Platform DX Mode'.bold if module_name == 'Base'
              core_base_dx_validate
            end
          end

          def append_migrations(app)
            unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
              config.paths['db/migrate'].expanded.each do |expanded_path|
                app.config.paths['db/migrate'] << expanded_path
              end
            end
          end

          def append_initializers(app)
            unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
              config.paths['config/initializers'].expanded.each do |expanded_path|
                app.config.paths['config/initializers'] << expanded_path
              end
            end
          end

          def core_base_dx_validate
            errors = []
            dx_validations.each do |v|
              v[:eval].call
            rescue StandardError
              errors << v[:message]
              break
            end

            if errors.length.positive?
              print '⚠️'.brown
              puts "  CORE::#{module_name}\t#{module_version}\t#{errors[0]}"
            else
              print '✔'.green
              puts "  CORE::#{module_name}\t#{module_version}"
            end
          end
        end
      end

      class Railtie < Rails::Engine
        include CoreRailtie
        
        def dx_validations 
          [
            {
              eval: proc { require 'pg' },
              message: "Error: 'pg' gem is required, add it your your gemfile"
            },
            {
              eval: proc { require 'graphql' },
              message: "Error: 'graphql' gem is required, add it your your gemfile"
            }
          ]
        end

        initializer :append_migrations do |app|
          append_migrations app
        end

        initializer :append_initializers do |app|
          append_initializers app
        end

        initializer :init_puma do |app|
          return unless defined?(Puma)

          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            config.paths.add('lib/core/base/puma/plugin')
            app.config.paths.add('app/lib/puma/plugin')
            config.paths['lib/core/base/puma/plugin'].expanded.each do |expanded_path|
              app.config.paths['app/lib/puma/plugin'] << expanded_path
            end
          end
        end

        config.after_initialize do
          after_init
        end
      end
    end
  end
end