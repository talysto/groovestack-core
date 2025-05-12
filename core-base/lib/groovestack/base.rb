# frozen_string_literal: true

require 'active_record'
require 'dry-configurable'
require 'graphql'
require 'pg'
require 'pg_lock'

require 'groovestack/base/version'
require 'groovestack/base/utilities/string'
require 'groovestack/base/settings'

module Groovestack
  module Base
    include ::Groovestack::Base::Settings
    
    module GraphQL
      module Authorization
        autoload :AuthorizedField, 'groovestack/base/graphql/authorization/authorized_field'
        autoload :AuthorizedObject, 'groovestack/base/graphql/authorization/authorized_object'
        autoload :VisibleField, 'groovestack/base/graphql/authorization/visible_field'
      end

      module Base
        autoload :Argument, 'groovestack/base/graphql/base/argument'
        autoload :Field, 'groovestack/base/graphql/base/field'
        autoload :Object, 'groovestack/base/graphql/base/object'
        autoload :InputObject, 'groovestack/base/graphql/base/input_object'
        autoload :Mutation, 'groovestack/base/graphql/base/mutation'
        autoload :Subscription, 'groovestack/base/graphql/base/subscription'
      end

      module Controllers
        autoload :Helpers, 'groovestack/base/graphql/controllers/helpers'
        autoload :Execute, 'groovestack/base/graphql/controllers/execute'
      end

      module Documentation
        autoload :Arguments, 'groovestack/base/graphql/documentation/arguments'
        autoload :Fields, 'groovestack/base/graphql/documentation/fields'
      end

      module Mutations
        autoload :AASMEventTrigger, 'groovestack/base/graphql/mutations/aasm_event_trigger'
        autoload :MethodTrigger, 'groovestack/base/graphql/mutations/method_trigger'
      end

      module Providers
        module ReactAdmin
          autoload :Resource, 'groovestack/base/graphql/providers/react_admin'
          module Types
            autoload :RAListMetadata, 'groovestack/base/graphql/providers/react_admin'
          end
        end
      end

      module Subscriptions
        autoload :Trigger, 'groovestack/base/graphql/subscriptions/trigger'
      end

      module Types
        autoload :AASMEventAttributes, 'groovestack/base/graphql/types/aasm_event_attributes'
        autoload :Currency, 'groovestack/base/graphql/types/currency'
        autoload :Money, 'groovestack/base/graphql/types/money'
        autoload :SubscriptionPayload, 'groovestack/base/graphql/types/subscription_payload'
        autoload :TypeResolver, 'groovestack/base/graphql/types/type_resolver'
      end

      module Tracers
        autoload :AtomicMultiplexTransaction, 'groovestack/base/graphql/tracers'
      end
    end

    autoload :ActiveRecord, 'groovestack/base/active_record'
    autoload :Listener, 'groovestack/base/listeners'
    autoload :Listeners, 'groovestack/base/listeners'

    autoload :PubSub, 'groovestack/base/pub_sub' if defined?(Wisper)
    autoload :CoreRailtie, 'groovestack/base/railtie' if defined?(Rails::Railtie)

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
        EventHandler = ::Groovestack::Base::GraphQL::Subscriptions::Trigger
      end

      module Types
        BaseArgument = ::Groovestack::Base::GraphQL::Base::Argument
        BaseField = ::Groovestack::Base::GraphQL::Base::Field
        BaseObject = ::Groovestack::Base::GraphQL::Base::Object
        Money = ::Groovestack::Base::GraphQL::Types::Money
        SubscriptionPayload = ::Groovestack::Base::GraphQL::Types::SubscriptionPayload
        AuthorizedBaseField = ::Groovestack::Base::GraphQL::Authorization::AuthorizedField
        AuthorizedBaseObject = ::Groovestack::Base::GraphQL::Authorization::AuthorizedObject
        VisibleBaseField = ::Groovestack::Base::GraphQL::Authorization::VisibleField
      end
      BaseInputObject = ::Groovestack::Base::GraphQL::Base::InputObject
      BaseMutation = ::Groovestack::Base::GraphQL::Base::Mutation
      module Documentation
        Arguments = ::Groovestack::Base::GraphQL::Documentation::Arguments
        Fields = ::Groovestack::Base::GraphQL::Documentation::Fields
      end
      BaseSubscription = ::Groovestack::Base::GraphQL::Base::Subscription
      module Helpers
        module Types
          StatusEventVirtualAttributes = ::Groovestack::Base::GraphQL::Types::AASMEventAttributes
          Typified = ::Groovestack::Base::GraphQL::Types::TypeResolver
        end

        module Mutations
          StatusEvents = ::Groovestack::Base::GraphQL::Mutations::AASMEventTrigger
          InstanceMethods = ::Groovestack::Base::GraphQL::Mutations::MethodTrigger
        end
        Controller = ::Groovestack::Base::GraphQL::Controllers::Helpers
      end

      module Providers
        module ReactAdmin
          Resource = ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource
          module Types
            RAListMetadata = ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata
          end
        end
      end

      module Tracers
        AtomicMultiplexTransaction = ::Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction
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
