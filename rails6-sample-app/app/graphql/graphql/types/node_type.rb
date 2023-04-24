# frozen_string_literal: true

module GraphQL
  module Types
    module NodeType
      include GraphQL::Types::BaseInterface
      # Add the `id` field
      include GraphQL::Types::Relay::NodeBehaviors
    end
  end
end
