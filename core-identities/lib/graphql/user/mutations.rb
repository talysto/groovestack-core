# frozen_string_literal: true

module GraphQL
  module User
    module Mutations
      class Update < ::Groovestack::Base::GraphQL::Base::Mutation
        argument :email, String, required: false
        argument :id, ID, required: true
        argument :language, String, required: false
        argument :name, String, required: false
        argument :roles, [String], required: false

        type ::GraphQL::User::Type

        def current_user
          context[:current_user]
        end

        def perform(id:, **attrs)
          obj = id == current_user&.id ? current_user : ::User.find(id)

          if !current_user.admin? && attrs[:roles].present?
            raise GraphQL::ExecutionError,
                  'Validation Failed: only admins can update user roles'
          end

          obj.update!(attrs)

          obj
        end
      end
    end
  end
end
