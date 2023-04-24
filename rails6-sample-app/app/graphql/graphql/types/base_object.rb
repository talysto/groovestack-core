# frozen_string_literal: true

module GraphQL
  module Types
    class BaseObject < GraphQL::Schema::Object
      edge_type_class(GraphQL::Types::BaseEdge)
      connection_type_class(GraphQL::Types::BaseConnection)
      field_class GraphQL::Types::BaseField
    end
  end
end