module Core
  module Jobs
    module Subscribers
      class QueState
        def notify_event(subscription, id, event)
          ::Core::Base::Publishers::GraphQLHub.new.trigger_event(subscription, { id: id }, event)
        end
      end
    end
  end
end