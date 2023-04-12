# frozen_string_literal: true

module Types
  class Query < Types::BaseObject
    include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource
    
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    include Queries::OrgUnit
    include Queries::User

    include ::Core::Accounting::GraphQL::Queries
    include ::Core::Comments::GraphQL::Queries
  end
end
