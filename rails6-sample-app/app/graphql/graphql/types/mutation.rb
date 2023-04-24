# frozen_string_literal: true

module GraphQL
  module Types
    class Mutation < Types::BaseObject
      include ::Core::Comments::GraphQL::Comment::Mutations
      include ::Core::Jobs::GraphQL::Job::Mutations
    end
  end
end
