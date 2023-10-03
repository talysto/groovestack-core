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
          # TODO: trigger pub event when notification is published
        end
      
        # def after_destroy(notification)

        # end
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do
  ::Core::Notifications::Notification.subscribe(::Core::Notifications::Subscribers::Notification.new)
end
