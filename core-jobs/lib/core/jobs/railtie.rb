# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Jobs
      class Railtie < Rails::Engine
        # config.before_initialize do
        #   puts "BEFORE"
        # end

        # engine_name 'something'
        # isolate_namespace SOMETHING

        # Enable our puma plugins for the parent app
        initializer :append_puma_plugins do |app|
          unless app.root.present? && root.present? && (app.root.to_s.match? root.to_s)
            config.paths.add('lib/core/jobs/puma/plugin')
            config.paths['lib/core/jobs/puma/plugin'].expanded.each do |expanded_path|
              app.config.paths.add('app/lib/puma/plugin')
              app.config.paths['app/lib/puma/plugin'] << expanded_path
            end
          end
        end

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
                          raise Core::Jobs::WrongSchemaFormat
                        end
                      end,
                message: 'Error: Must change your schema format to :sql. In application.rb, ' \
                         'add \'config.active_record.schema_format = :sql\''
              },
              {
                eval: proc { Que::ActiveRecord::Model.count },
                message: 'Error: Must run migration for que.'
              },
              {
                eval: proc do
                        unless Rails.application.config.active_job.queue_adapter == :que
                          raise Core::Jobs::WrongActiveJobQueueAdapter
                        end
                      end,
                message: 'Error: Must change your active job queue adapter to :que. ' \
                         'In application.rb, add \'config.active_job.queue_adapter = :que\''
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
              puts "  CORE::Jobs\t#{Core::Jobs::VERSION}\t#{errors[0]}"
            else
              print '✔'.green
              puts "  CORE::Jobs\t#{Core::Jobs::VERSION}"
            end

            # begin
            # Verify deps/env
            # postgres, graphql (optional), rails (optional)
            # begin
            #   require 'pg'
            # rescue
            #   raise DepPostgresRequired
            # end

            # req_graphql = true
            # begin
            #   require 'graphql'
            # rescue LoadError
            #   req_graphql = false
            # end

            # raise Core::Jobs::WrongSchemaFormat unless Rails.application.config.active_record.schema_format == :sql
            # Que::ActiveRecord::Model.count

            # puts "  Warn: Skipping 'graphql' config #{req_graphql}"

            # rescue Core::Jobs::DepPostgresRequired
            #   puts "⚠️  Error: 'pg' gem is required, add it your your gemfile"

            # rescue Core::Jobs::WrongSchemaFormat
            #   puts "⚠️  Error: Must change your schema format to :sql."

            # rescue ActiveRecord::StatementInvalid
            #   puts "⚠️  Error: Have you run the migrations?"

            # rescue StandardError => error
            #   puts "⚠️  CORE::JOBS configuration error: "
            #   puts error.class
            #   puts error
            # else
            #   puts '✔'.green
            # end

          end
        end

        # Does the Railtie has tasks?
        # rake_tasks do
        #   load "path/to/my_railtie.tasks"
        # end

        # Does the Railtie have generators?
        # generators do
        #   require "path/to/my_railtie_generator"
        # end
      end
    end
  end
end
