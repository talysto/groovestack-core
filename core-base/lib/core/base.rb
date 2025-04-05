# frozen_string_literal: true

require 'active_record'
require 'dry-configurable'
require 'graphql'
require 'pg'
require 'pg_lock'

require 'core/base/version'
require 'core/base/utilities/string'

module Core
  module Base
    module GraphQL
      module Subscriptions
        autoload :EventHandler, 'core/base/graphql/subscriptions/event_handler'
      end

      autoload :Types, 'core/base/graphql/types'
      autoload :BaseInputObject, 'core/base/graphql/base_input_object'
      autoload :BaseMutation, 'core/base/graphql/base_mutation'
      autoload :Documentation, 'core/base/graphql/documentation'
      autoload :BaseSubscription, 'core/base/graphql/base_subscription'
      autoload :Helpers, 'core/base/graphql/helpers'

      module Tracers
        autoload :AtomicMultiplexTransaction, 'core/base/graphql/tracers/atomic_multiplex_transaction'
      end

      module Providers
        module ReactAdmin
          autoload :Resource, 'core/base/graphql/providers/react_admin/resource'
          autoload :Types, 'core/base/graphql/providers/react_admin/types'
        end
      end
    end

    autoload :ActiveRecord, 'core/base/active_record'
    autoload :Listeners, 'core/base/listeners'

    autoload :PubSub, 'core/base/pub_sub' if defined?(Wisper)
    autoload :Railtie, 'core/base/railtie' if defined?(Rails::Railtie)

    extend Dry::Configurable

    DEFAULT_ERROR_MONITOR =  ::Logger.new($stdout)

    # ex:
    #   /config/initializers/core_base.rb

    #   Core::Base.configure do |config|
    #     config.error_notifier.handler = Bugsnag
    #   end
    setting :error_notifier, reader: true do
      setting :handler, reader: true
      setting :notify_method, reader: true, default: :notify
    end

    setting :graphql do
      setting :camelize, default: false
    end

    def self.notify_error(prefix, err)
      msg = "#{[prefix, 'error'].compact.join(' ')}: #{err}"

      if error_notifier&.handler.present?
        error_notifier.handler.send(error_notifier.notify_method, msg)
      else
        DEFAULT_ERROR_MONITOR.error(msg)
      end
    end

    class Error < StandardError; end
    class WrongSchemaFormat < Core::Base::Error; end
  end
end

require 'core/base/puma/plugin/core_cron' if defined?(Puma)
