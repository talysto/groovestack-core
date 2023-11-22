module Types
  class MutationType < ::Core::Base::GraphQL::Types::BaseObject
    include ::Core::Jobs::GraphQL::Job::Mutations

    include ::GraphQL::User::Mutations
    include ::GraphQL::Identity::Mutations
  end
end