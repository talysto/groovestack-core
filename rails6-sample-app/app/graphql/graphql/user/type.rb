# frozen_string_literal: true

module GraphQL
  module User
    class Type < ::Core::Base::GraphQL::BaseObject
      include ::Core::Comments::GraphQL::Comment::Types::Commentable

      field :email, String, null: false
      field :id, ID, null: false
      field :name, String, null: false
    end
  end
end
