# frozen_string_literal: true

module GraphQL
  module Identity
    module Mutations
      class Delete < ::Groovestack::Base::GraphQL::Base::Mutation
        argument :id, ID, required: true

        type ::GraphQL::Identity::Type

        def perform(id:)
          identity = ::Identity.find(id)

          identity.destroy!

          identity
        end
      end
    end
  end
end
