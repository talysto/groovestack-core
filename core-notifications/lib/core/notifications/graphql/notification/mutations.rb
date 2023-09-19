# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        module Mutations
          class Create < ::Core::Base::GraphQL::BaseMutation
            description 'Create a notification'

            type ::Core::Notifications::GraphQL::Notification::Type

            def resolve(**attrs)
              notification = ::Core::Notifications::Notification.create!(**attrs)
              notification
            end
          end

          # class Delete < ::Core::Base::GraphQL::BaseMutation
          #   description 'Delete a notification'

          #   argument :id, ID, required: true, description: 'notification id'

          #   type ::Core::Notifications::GraphQL::Notification::Type

          #   def resolve(id:)
          #     notification = ::Core::Notifications::Notification.find(id)
          #     notification.destroy!
          #   end
          # end

          class Update < ::Core::Base::GraphQL::BaseMutation
            description 'Update a notification'

            argument :id, ID, required: true, description: 'notification id'

            type ::Core::Notifications::GraphQL::Notification::Type

            def resolve(id:, **attrs)
              notification = ::Core::Notifications::Notification.find(id)
              notification.update!(id, **attrs)
              notification
            end
          end

          extend ActiveSupport::Concern

          included do
            field :create_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Create, description: 'Create a notification'
            # field :delete_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Delete, description: 'Delete a notification'
            field :update_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Update, description: 'Update a notification'
          end
        end
      end
    end
  end
end
