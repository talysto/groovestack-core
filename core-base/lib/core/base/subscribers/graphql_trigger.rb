module Core 
  module Base
    module Subscribers
      class GraphqlTrigger
        def graphql_trigger_event(subscription, args, event)
          ::Core::Base::GraphQL::TriggerHandler.fire(subscription, args, event)
        end
      end
    end
  end
end