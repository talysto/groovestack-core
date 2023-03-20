
class String
  def black;          "\e[30m#{self}\e[0m" end
  def red;            "\e[31m#{self}\e[0m" end
  def green;          "\e[32m#{self}\e[0m" end
  def brown;          "\e[33m#{self}\e[0m" end
  def blue;           "\e[34m#{self}\e[0m" end
  def magenta;        "\e[35m#{self}\e[0m" end
  def cyan;           "\e[36m#{self}\e[0m" end
  def gray;           "\e[37m#{self}\e[0m" end

  def bg_black;       "\e[40m#{self}\e[0m" end
  def bg_red;         "\e[41m#{self}\e[0m" end
  def bg_green;       "\e[42m#{self}\e[0m" end
  def bg_brown;       "\e[43m#{self}\e[0m" end
  def bg_blue;        "\e[44m#{self}\e[0m" end
  def bg_magenta;     "\e[45m#{self}\e[0m" end
  def bg_cyan;        "\e[46m#{self}\e[0m" end
  def bg_gray;        "\e[47m#{self}\e[0m" end

  def bold;           "\e[1m#{self}\e[22m" end
  def italic;         "\e[3m#{self}\e[23m" end
  def underline;      "\e[4m#{self}\e[24m" end
  def blink;          "\e[5m#{self}\e[25m" end
  def reverse_color;  "\e[7m#{self}\e[27m" end
end

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
          if (ENV["RAILS_ENV"] || ENV["RACK_ENV"]) == 'development'

            validations = [
              {
                eval: Proc.new { require 'pg' },
                message: "Error: 'pg' gem is required, add it your your gemfile" 
              },
              {
                eval: Proc.new { require 'graphql' },
                message: "Error: 'graphql' gem is required, add it your your gemfile" 
              },
              {
                eval: Proc.new { raise unless defined?(::Core::Base) },
                message: "Error: 'core-base' gem is required, add it your your gemfile" 
              },
              {
                eval: Proc.new { raise Core::Jobs::WrongSchemaFormat unless Rails.application.config.active_record.schema_format == :sql },
                message: 'Error: Must change your schema format to :sql. In application.rb, add \'config.active_record.schema_format = :sql\''
              },
              {
                eval: Proc.new { Que::ActiveRecord::Model.count },
                message: 'Error: Must run migration for que.'
              },
              {
                eval: Proc.new { raise Core::Jobs::WrongActiveJobQueueAdapter unless Rails.application.config.active_job.queue_adapter == :que },
                message: 'Error: Must change your active job queue adapter to :que.  In application.rb, add \'config.active_job.queue_adapter = :que\''
              }
            ]

            puts 'CORE Platform DX Mode'.bold

            errors = []
            validations.each do |v|
              begin
                v[:eval].call
              rescue
                errors << v[:message]
                break
              end
            end

            if errors.length > 0
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
