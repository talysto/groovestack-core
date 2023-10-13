module Core
  module Base
    module PubSub
      class GraphQLPublisher
        include Wisper::Publisher

        def trigger_event(subscription, args, event, **kwargs)
          publish(:graphql_trigger_event, subscription, args, event, kwargs)
        end
      end

      class GraphQLSubscriber
        def graphql_trigger_event(subscription, args, event, kwargs)
          ::Core::Base::GraphQL::Subscriptions::EventHandler.trigger(subscription, args, event, kwargs)
        end
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do
  ::Core::Base::PubSub::GraphQLPublisher.subscribe(::Core::Base::PubSub::GraphQLSubscriber.new)
end