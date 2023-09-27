module Core
  module Jobs
    module Publishers
      class QueState
        include Wisper::Publisher

        def notify_event(subscription, id, event)
          publish(:notify_event, subscription, id, event)
        end
      end
    end
  end
end