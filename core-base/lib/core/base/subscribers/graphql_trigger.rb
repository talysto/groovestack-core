module Core 
  module Base
    module Subscribers
      class GraphqlTrigger
        def graphql_trigger_event(subscription, args, event, kwargs)
          ::Core::Base::GraphQL::TriggerHandler.fire(subscription, args, event, kwargs)
        end
      end
    end
  end
end