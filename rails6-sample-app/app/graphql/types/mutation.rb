# frozen_string_literal: true

module Types
  class Mutation < Types::BaseObject
    include ::Core::Comments::GraphQL::Mutations
  end
end
