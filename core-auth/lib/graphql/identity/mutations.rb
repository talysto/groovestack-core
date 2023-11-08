# frozen_string_literal: true

module GraphQL
  module Identity
    module Mutations
      class Delete < ::Core::Base::GraphQL::BaseMutation
        argument :id, ID, required: true
  
        type ::GraphQL::Identity::Type
  
        def resolve(id:)
          identity = ::Identity.find(id)
  
          identity.destroy!
  
          identity
        end
      end

      extend ActiveSupport::Concern

      included do
        field :delete_identity, mutation: ::GraphQL::Identity::Mutations::Delete, description: 'delete identity'
      end
    end
  end
end
