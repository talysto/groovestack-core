module Types
  class UserType < Types::BaseObject
    include ::Core::Comments::GraphQL::Types::Commentable
    
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
  end
end