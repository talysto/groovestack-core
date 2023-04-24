# frozen_string_literal: true

module GraphQL
  module Types
    class BaseUnion < GraphQL::Schema::Union
      edge_type_class(GraphQL::Types::BaseEdge)
      connection_type_class(GraphQL::Types::BaseConnection)
    end
  end
end
