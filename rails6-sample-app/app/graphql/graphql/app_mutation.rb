# frozen_string_literal: true

module GraphQL
  class AppMutation < ::Core::Base::GraphQL::BaseObject
    include ::Core::Comments::GraphQL::Comment::Mutations
    include ::Core::Jobs::GraphQL::Job::Mutations
  end
end
