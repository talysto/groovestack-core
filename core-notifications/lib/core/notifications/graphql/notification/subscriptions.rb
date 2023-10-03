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
              payload(event: { type: :subscribe })
            end

            def update(_attrs = {})
              payload(event: { type: object[:crud_action], ids: object[:notification_ids] })
            end

            # HELPER METHODS

            def payload(event:)
              # only triggering collection
              {
                topic: "resource/Notification",
                event: event,
              }
            end
          end

          included do
            field :Notification_collection, subscription: ::Core::Notifications::GraphQL::Notification::Subscriptions::Collection
          end
        end
      end
    end
  end
end