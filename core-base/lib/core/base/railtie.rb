# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Base
      class Railtie < Rails::Engine

        def core_base_dx_validate(validations, module_name)
          errors = []
          validations.each do |v|
            v[:eval].call
          rescue StandardError
            errors << v[:message]
            break
          end

          if errors.length.positive?
            print '⚠️'.brown
            puts "  CORE::#{module_name}\t#{Core::Base::VERSION}\t#{errors[0]}"
          else
            print '✔'.green
            puts "  CORE::#{module_name}\t#{Core::Base::VERSION}"
          end
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

        # Enable our new migrations for the parent app
        initializer :append_migrations do |app|
          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            # config.paths['db/migrate'].expanded.each do |expanded_path|
            #   app.config.paths['db/migrate'] << expanded_path
            # end
          end
        end

        # Enable our new initializers for the parent app
        initializer :append_initializers do |app|
          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            # config.paths['config/initializers'].expanded.each do |expanded_path|
            #   app.config.paths['config/initializers'] << expanded_path
            # end
          end
        end

        config.after_initialize do
          if (ENV['RAILS_ENV'] || ENV.fetch('RACK_ENV', nil)) == 'development'
            validations = [
              {
                eval: proc { require 'pg' },
                message: "Error: 'pg' gem is required, add it your your gemfile"
              },
              {
                eval: proc { require 'graphql' },
                message: "Error: 'graphql' gem is required, add it your your gemfile"
              }
            ]

            core_base_dx_validate(validations, 'Base')
            puts 'CORE Platform DX Mode'.bold
          end
        end
      end
    end
  end
end