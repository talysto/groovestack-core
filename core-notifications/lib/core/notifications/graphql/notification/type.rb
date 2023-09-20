# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        class Type < ::Core::Base::GraphQL::BaseObject
          description 'A core notification'

          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.ids
          
          field :expires_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'expiration timestamp'
          field :publish_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'publish timestamp'
          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'created timestamp'
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'last touched'
        end
      end
    end
  end
end
