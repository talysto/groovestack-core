module Core
  module Notifications
    module GraphQL
      module Notification
        module Subscriptions
          extend ActiveSupport::Concern

          class Collection < ::Core::Base::GraphQL::BaseSubscription
            subscription_scope :current_user_id # only send notifications to the current user

            type ::Core::Base::GraphQL::Types::SubscriptionPayload, null: false

            def subscribe(_attrs = {})
              { subscription: 'all_notifications', event: { type: :subscribe } }
            end

            def update(_attrs = {})
              { subscription: 'all_notifications', event: { type: object[:crud_action], ids: object[:notification_ids] } }
            end
          end

          included do
            field :all_notifications, subscription: ::Core::Notifications::GraphQL::Notification::Subscriptions::Collection
          end
        end
      end
    end
  end
end