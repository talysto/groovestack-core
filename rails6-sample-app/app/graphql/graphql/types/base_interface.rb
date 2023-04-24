# frozen_string_literal: true

module GraphQL
  module Types
    module BaseInterface
      include GraphQL::Schema::Interface
      edge_type_class(GraphQL::Types::BaseEdge)
      connection_type_class(GraphQL::Types::BaseConnection)

      field_class GraphQL::Types::BaseField
    end
  end
end
