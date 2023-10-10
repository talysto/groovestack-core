module Core
  module Jobs 
    module PubSub
      class QueStatePublisher
        include Wisper::Publisher

        def notify_event(subscription, id, event)
          publish(:notify_event, subscription, id, event)
        end
      end

      class QueStateSubscriber
        def notify_event(subscription, id, event)
          ::Core::Base::PubSub::GraphQLPublisher.new.trigger_event(subscription, { id: id }, event)
        end
      end
    end
  end
end