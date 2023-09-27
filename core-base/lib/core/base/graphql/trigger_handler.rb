module Core 
  module Base
    module GraphQL
      class TriggerHandler
        def self.fire(subscription, args, event)
          # TODO: this is a hack to get the app schema
          # should be configurable
          # can have multiple schemas per app

          app_schema = ::GraphQL::Schema.descendants.find {|s| !s.name.ends_with?('NullSchema') }

          raise 'app schema not defined' unless app_schema

          app_schema.subscriptions.trigger(subscription, args, event)
        end
      end
    end
  end
end