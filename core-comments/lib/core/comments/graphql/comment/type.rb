# frozen_string_literal: true

module Core
  module Comments
    module GraphQL
      module Comment
        class Type < ::Core::Base::GraphQL::Types::BaseObject
          description 'A comment'

          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.id

          field :body, String, null: false, description: 'body of comment'

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false,description: ::Core::Base::GraphQL::Documentation::Fields.created_at
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.updated_at

          # relations
          field :author_id, ID, null: false, description: 'id of author relation'
          field :author_type, String, null: false, description: 'class of author relation'
          field :resource_id, ID, null: false, description: 'id of resource relation'
          field :resource_type, String, null: false, description: 'class of resource relation'
        end
      end
    end
  end
end
