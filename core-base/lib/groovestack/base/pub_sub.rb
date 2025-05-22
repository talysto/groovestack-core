# frozen_string_literal: true

module Groovestack
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
          ::Groovestack::Base::GraphQL::Subscriptions::EventHandler.trigger(subscription, args, event, kwargs)
        end
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do
  ::Groovestack::Base::PubSub::GraphQLPublisher.subscribe(::Groovestack::Base::PubSub::GraphQLSubscriber.new)
end
