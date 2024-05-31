# frozen_string_literal: true

if defined?(Rails)
  module Core
    module Jobs
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
                        raise Core::Base::WrongSchemaFormat
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
        end

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
