# frozen_string_literal: true

module GraphQL
  module Types
    class BaseField < GraphQL::Schema::Field
      argument_class GraphQL::Types::BaseArgument
    end
  end
end
