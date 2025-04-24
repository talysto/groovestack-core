# frozen_string_literal: true

module GraphQL
  module User
    class Type < ::Groovestack::Base::GraphQL::Base::Object
      include ::Groovestack::Base::GraphQL::Types::TypeResolver

      description 'A user'

      field :id, ID, null: false, description: 'id'
      field :email, String, null: true, description: 'email'
      field :language, String, null: true, description: 'user language'
      field :name, String, null: true, description: 'name'
      field :roles, [String], null: true, description: 'roles'
      
      field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'created at'
      field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'updated at'

      # associations

      field :identities, [::GraphQL::Identity::Type], null: false, description: 'identities'
    end
  end
end
