module Core
  module Base
    module Publishers
      class GraphQLHub
        include Wisper::Publisher

        def trigger_event(subscription, args, event)
          publish(:graphql_trigger_event, subscription, args, event)
        end
      end
    end
  end
end