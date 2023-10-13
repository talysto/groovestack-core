# frozen_string_literal: true

require 'puma/plugin'

# Need to pre-declare Puma::Plugin here - not sure why, but it's innocusous so leave it
module Puma
  class Plugin # rubocop:disable Lint/EmptyClass
  end
end

Puma::Plugin.create do
  def production?
    ENV.fetch('RACK_ENV', 'development') == 'production'
  end

  def log(msg)
    if production?
      Rails.logger.info msg
    else
      puts msg
    end
  end

  def flush
    Rails.logger.flush if production?
  end

  def start(_launcher)
    cmd = 'que -q high -q default -q low --worker-count=2'
    in_background do
      log '[que] Starting que worker with options:'
      log "[que] > #{cmd}"
      system cmd
    end
  end
end
