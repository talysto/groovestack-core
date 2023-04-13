# frozen_string_literal: true

module GraphQL
  module Types
    class BaseInputObject < GraphQL::Schema::InputObject
      argument_class GraphQL::Types::BaseArgument
    end
  end
end
