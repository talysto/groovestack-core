module Core
  module Webhooks
    module GraphQL
      module Event
        class Type < ::Core::Base::GraphQL::Types::BaseObject
          description 'A webhook event'
          graphql_name 'WebhookEvent'

          field :data, ::GraphQL::Types::JSON, null: true, description: 'data'
          field :event, String, null: true, description: 'event'
          field :id, ID, null: false, description: 'ID'
          field :source, String, null: false, description: 'source'
          field :status, String, null: false, description: 'status'

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'created_at'
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'updated_at'
        end
      end
    end
  end
end
