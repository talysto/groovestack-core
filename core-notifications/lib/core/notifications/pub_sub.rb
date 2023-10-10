module Core 
  module Notifications
    module PubSub
      class NotificationPublisher
        include Wisper::Publisher

        def trigger_action_response(notification)
          return unless notification.is_a?(::Core::Notifications::Task) && notification.action_response.present?

          publish(:trigger_action_response, notification)
        end
      end

      class NotificationSubscriber
        def after_create(notification)
          return unless notification.active?

          if notification.to_id.present?
            ::Core::Base::PubSub::GraphQLPublisher.new.trigger_event(:all_notifications, {}, { crud_action: :created, notification_ids: [notification.id] }, scope: notification.to_id)
          elsif notification.to_scope.present?
            notification.to_records.each do |record|
              ::Core::Base::PubSub::GraphQLPublisher.new.trigger_event(:all_notifications, {}, { crud_action: :created, notification_ids: [notification.id] }, scope: record.id)
            end
          end
        end
      
        def after_update(notification)
          if notification.is_a?(::Core::Notifications::Task) && notification.saved_change_to_action_response? && notification.action_response.present?
            ::Core::Notifications::PubSub::NotificationPublisher.new.trigger_action_response(notification)
          elsif notification.is_a?(::Core::Notifications::Simple) && notification.saved_change_to_read_at? && notification.read_at.present?
            ::Core::Base::PubSub::GraphQLPublisher.new.trigger_event(:all_notifications, {}, { crud_action: :updated, notification_ids: [notification.id] }, scope: notification.to_id)
          elsif notification.is_a?(::Core::Notifications::Global) && notification.saved_change_to_read_bloom? && notification.read_bloom.present?
            notification.to_records.each do |record|
              ::Core::Base::PubSub::GraphQLPublisher.new.trigger_event(:all_notifications, {}, { crud_action: :updated, notification_ids: [notification.id] }, scope: record.id)
            end
          end
        end
      end
    end
  end
end