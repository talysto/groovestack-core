# frozen_string_literal: true

module GraphQL
  class AppQuery < ::Core::Base::GraphQL::Types::BaseObject
    include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource
    
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    include OrgUnit::Queries
    include User::Queries

    include ::Core::Accounting::GraphQL::Line::Queries
    include ::Core::Comments::GraphQL::Comment::Queries
    include ::Core::Jobs::GraphQL::Job::Queries
    include ::Core::Versions::GraphQL::Version::Queries
  end
end
