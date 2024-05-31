# frozen_string_literal: true

require 'dry-configurable'
require 'graphql'
require 'pg'

require 'core/base/utilities/string'

require 'core/base/version'
require 'core/base/puma/plugin/core_cron'
require 'core/base/railtie' if defined?(Rails::Railtie)

require 'core/base/graphql/subscriptions/event_handler'
require 'core/base/graphql/types'
require 'core/base/graphql/base_input_object'
require 'core/base/graphql/base_mutation'
require 'core/base/graphql/documentation'
require 'core/base/graphql/base_subscription'
require 'core/base/graphql/helpers'

require 'core/base/graphql/providers/react_admin/resource'
require 'core/base/graphql/providers/react_admin/types'

require 'core/base/active_record'
require 'core/base/listeners'

require 'core/base/pub_sub' if defined?(Wisper)

module Core
  module Base
    extend Dry::Configurable

    DEFAULT_ERROR_MONITOR =  ::Logger.new(STDOUT)

    # ex: 
    #   Core::Base.configure do |config|
    #     config.error_notifier.handler = Bugsnag
    #   end
    setting :error_notifier, reader: true do 
      setting :handler, reader: true
      setting :notify_method, reader: true, default: :notify
    end

    def self.notify_error(prefix, e)
      msg = "#{[prefix, 'error'].compact.join(' ')}: #{e}"

      if error_notifier&.handler.present?
        error_notifier.handler.send(error_notifier.notify_method, msg)
      else
         DEFAULT_ERROR_MONITOR.error(msg)
      end
    end
  end
end
