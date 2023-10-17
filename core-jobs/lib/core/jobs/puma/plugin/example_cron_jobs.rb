require 'puma/plugin'

# Need to pre-declare Puma::Plugin here - not sure why, but it's innocusous so leave it
module Puma
  class Plugin # rubocop:disable Lint/EmptyClass
  end
end

Puma::Plugin.create do # rubocop:disable Metrics/BlockLength
  def production?
    ENV.fetch('RACK_ENV', 'development') == 'production'
  end

  def log(msg)
    if production? && defined?(Rails)
      Rails.logger.info msg
    else
      puts msg
    end
  end

  def flush
    Rails.logger.flush if production? && defined?(Rails)
  end

  def start(_launcher)
    trap('TERM') do
      puts '[example-cron-jobs] Graceful shutdown'
    end

    in_background do
      sleep 10
      log '[example-cron-jobs] Starting example-cron-jobs worker'

      loop do
        log '[example-cron-jobs] Inserting new jobs.'

        rand(0..10).times do 
          ::Core::Jobs::ExampleJob.descendants.sample.perform_later
        end

        sleep 60
      end
    end
  end
end
