# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        class Type < ::Core::Base::GraphQL::Types::BaseObject
          description 'A core notification'

          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.ids
          field :type, String, null: false, description: 'notification type'
          field :title, String, null: false, description: 'notification title'
          field :description, String, null: false, description: 'notification description'
          
          field :to_type, String, null: false, description: 'notification to type'
          field :to_id, ID, null: true, description: 'notification to id'
          field :to_scope, String, null: true, description: 'notification to scope'

          field :from_type, String, null: true, description: 'notification from type'
          field :from_id, ID, null: true, description: 'notification from id'

          field :object_type, String, null: true, description: 'notification object type'
          # NOTE object_id appears to be a reserved field name in GraphQL, so we need to use a custom resolver to get the value
          field :object_id, ID, null: true, description: 'notification object id', resolver_method: :notification_object_id

          field :link, ::GraphQL::Types::JSON, null: true, description: 'notification link'
          field :actions, ::GraphQL::Types::JSON, null: true, description: 'notification actions'
          field :action_response, String, null: true, description: 'notification action response'
          field :read_bloom, [String], null: true, description: 'notification read bloom'

          field :expire_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'expiration timestamp'
          field :publish_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'publish timestamp'
          field :read_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'publish timestamp'
          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'created timestamp'
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'last touched'

          def notification_object_id
            object.object_id
          end
        end
      end
    end
  end
end
