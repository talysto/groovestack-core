module Core
  module Notifications
    module Publishers
      class Notification
        include Wisper::Publisher

        def trigger_action_response(notification)
          return unless notification.is_a?(::Core::Notifications::Task) && notification.action_response.present?

          publish(:trigger_action_response, notification)
        end
      end
    end
  end
end