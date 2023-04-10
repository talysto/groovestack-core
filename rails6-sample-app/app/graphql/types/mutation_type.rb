# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    include ::Core::Comments::GraphQL::Mutations
  end
end
