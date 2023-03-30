module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    include Queries::OrgUnit 
    include Queries::User

    include ::Core::Accounting::GraphQL::Queries
    include ::Core::Comments::GraphQL::Queries
  end
end
