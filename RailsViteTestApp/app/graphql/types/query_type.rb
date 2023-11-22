module Types
  class QueryType < ::Core::Base::GraphQL::Types::BaseObject
    include ::Core::Config::GraphQL::App::Queries
    include ::Core::Jobs::GraphQL::Job::Queries

    include ::GraphQL::User::Queries
    include ::GraphQL::Identity::Queries
  end
end