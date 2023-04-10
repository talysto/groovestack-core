# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    include ::Core::Comments::GraphQL::Types::Commentable

    field :email, String, null: false
    field :id, ID, null: false
    field :name, String, null: false
  end
end
