# frozen_string_literal: true

require 'active_record'
require 'dry-configurable'
require 'graphql'
require 'pg'
require 'pg_lock'

require 'groovestack/base/version'
require 'groovestack/base/utilities/string'

module Groovestack
  module Base
    module GraphQL
      module Subscriptions
        autoload :EventHandler, 'groovestack/base/graphql/subscriptions/event_handler'
      end

      autoload :Types, 'groovestack/base/graphql/types'
      autoload :BaseInputObject, 'groovestack/base/graphql/base_input_object'
      autoload :BaseMutation, 'groovestack/base/graphql/base_mutation'
      autoload :Documentation, 'groovestack/base/graphql/documentation'
      autoload :BaseSubscription, 'groovestack/base/graphql/base_subscription'
      autoload :Helpers, 'groovestack/base/graphql/helpers'

      module Tracers
        autoload :AtomicMultiplexTransaction, 'groovestack/base/graphql/tracers/atomic_multiplex_transaction'
      end

      module Providers
        module ReactAdmin
          autoload :Resource, 'groovestack/base/graphql/providers/react_admin/resource'
          autoload :Types, 'groovestack/base/graphql/providers/react_admin/types'
        end
      end
    end

    autoload :ActiveRecord, 'groovestack/base/active_record'
    autoload :Listener, 'groovestack/base/listeners'
    autoload :Listeners, 'groovestack/base/listeners'

    autoload :PubSub, 'groovestack/base/pub_sub' if defined?(Wisper)
    autoload :CoreRailtie, 'groovestack/base/railtie' if defined?(Rails::Railtie)

    extend Dry::Configurable

    DEFAULT_ERROR_MONITOR =  ::Logger.new($stdout)

    # ex:
    #   /config/initializers/core_base.rb

    #   Groovestack::Base.configure do |config|
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
    class WrongSchemaFormat < Groovestack::Base::Error; end
  end
end

require 'groovestack/base/puma/plugin/core_cron' if defined?(Puma)

# TODO: remove aliases after all core modules have been updated
# to reference Groovestack::Base
module Core
  module Base
    module GraphQL
      module Subscriptions
        EventHandler = ::Groovestack::Base::GraphQL::Subscriptions::EventHandler
      end

      Types = ::Groovestack::Base::GraphQL::Types
      BaseInputObject = ::Groovestack::Base::GraphQL::BaseInputObject
      BaseMutation = ::Groovestack::Base::GraphQL::BaseMutation
      Documentation = ::Groovestack::Base::GraphQL::Documentation
      BaseSubscription = ::Groovestack::Base::GraphQL::BaseSubscription
      Helpers = ::Groovestack::Base::GraphQL::Helpers

      module Tracers
        AtomicMultiplexTransaction = ::Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction
      end

      module Providers
        module ReactAdmin
          Resource = ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource
          Types = ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Types
        end
      end
    end

    ActiveRecord = ::Groovestack::Base::ActiveRecord
    Listener = ::Groovestack::Base::Listener
    Listeners = ::Groovestack::Base::Listeners

    PubSub = ::Groovestack::Base::PubSub if defined?(Wisper)
    CoreRailtie = ::Groovestack::Base::CoreRailtie if defined?(Rails::Railtie)

    extend Dry::Configurable

    DEFAULT_ERROR_MONITOR =  ::Logger.new($stdout)

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

    Error = ::Groovestack::Base::Error
    WrongSchemaFormat = ::Groovestack::Base::WrongSchemaFormat
  end
end
