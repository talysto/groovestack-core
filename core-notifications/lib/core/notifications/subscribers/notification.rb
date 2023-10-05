module Core
  module Notifications
    module Subscribers
      class Notification 
        def after_create(notification)
          return unless notification.active?

          if notification.to_id.present?
            ::Core::Base::Publishers::GraphQLHub.new.trigger_event(:Notification_collection, {}, { crud_action: :created, notification_ids: [notification.id] }, scope: notification.to_id)
          elsif notification.to_scope.present?
            notification.to_records.each do |record|
              ::Core::Base::Publishers::GraphQLHub.new.trigger_event(:Notification_collection, {}, { crud_action: :created, notification_ids: [notification.id] }, scope: record.id)
            end
          end
        end
      
        def after_update(notification)
          if notification.is_a?(::Core::Notifications::Task) && notification.saved_change_to_action_response? && notification.action_response.present?
            ::Core::Notifications::Publishers::Notification.new.trigger_action_response(notification)
          elsif notification.is_a?(::Core::Notifications::Simple) && notification.saved_change_to_read_at? && notification.read_at.present?
            ::Core::Base::Publishers::GraphQLHub.new.trigger_event(:Notification_collection, {}, { crud_action: :updated, notification_ids: [notification.id] }, scope: notification.to_id)
          elsif notification.is_a?(::Core::Notifications::Global) && notification.saved_change_to_read_bloom? && notification.read_bloom.present?
            notification.to_records.each do |record|
              ::Core::Base::Publishers::GraphQLHub.new.trigger_event(:Notification_collection, {}, { crud_action: :updated, notification_ids: [notification.id] }, scope: record.id)
            end
          end
        end
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do
  ::Core::Notifications::Notification.subscribe(::Core::Notifications::Subscribers::Notification.new)
end
