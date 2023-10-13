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
      puts '[core-cron] Graceful shutdown'
    end

    in_background do
      log '[core-cron] Starting core-cron worker'
      log '[core-cron] Waiting for CORE-CRON PGLock'

      loop do
        begin
          core_listeners = []

          # hold the command for 30 minutes
          PgLock.new(name: 'core-cron-commander', ttl: 30.minutes.to_i, attempts: 1).lock do
            log '[core-cron] Obtained CORE-CRON PGLock'

            core_listeners = ::Core::Base::Listeners::InitAll.run(throttle_seconds: 1)
          end
        rescue Timeout::Error
          # normal behavior - don't do anything when this happens

          # ensure channels closed and connections checked in for listeners
          core_listeners.each(&:unlisten)
          core_listeners.each(&:disconnect)
        end

        puts 'PGLock expired. Taking a breath before attempting to re-aquire.'
        # Loop and keep checking for CORE-CRON command
        sleep 14
      end
    end
  end
end
