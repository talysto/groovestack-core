module GraphQL
  module Identity
    class Type < ::Core::Base::GraphQL::Types::BaseObject
      description 'An identity'

      graphql_name 'Identity'

      field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'created at'
      field :id, ID, null: false, description: 'id'
      field :uid, String, null: false, description: 'uid'
      field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'updated at'

      field :provider, String, null: true, description: 'provider'

      # associations

      field :user_id, ID, null: false, description: 'user id of the user the identity is associated with'
    end
  end
end