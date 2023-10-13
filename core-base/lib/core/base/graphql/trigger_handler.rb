module Core 
  module Base
    module GraphQL
      class TriggerHandler
        def self.fire(subscription, args, event, kwargs)
          # TODO: this is a hack to get the app schema
          # should be configurable
          # can have multiple schemas per app

          app_schema = ::GraphQL::Schema.descendants.find {|s| !s.name.ends_with?('NullSchema') }

          raise 'app schema not defined' unless app_schema

          # ::Rails.logger.info "Triggering subscription #{subscription} with args #{args} and event #{event} and kwargs #{kwargs}"

          app_schema.subscriptions.trigger(subscription, args, event, **kwargs)
        end
      end
    end
  end
end