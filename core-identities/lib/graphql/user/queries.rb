# frozen_string_literal: true

module GraphQL
  module User
    module Queries
      extend ActiveSupport::Concern

      included do
        include ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource

        react_admin_resource :users, graphql_path: 'GraphQL'

        def User(id:) # rubocop:disable Naming/MethodName
          id == 'me' ? current_user : ::User.find(id)
        end
      end

      def current_user
        context[:current_user]
      end

      def users_scope(base_scope:, sort_field: nil, sort_order: nil, filter: {}) # rubocop:disable Metrics/AbcSize
        scope = base_scope
        scope = scope.where(id: filter.ids) if filter.ids.present?

        if filter.q.present?
          scope = scope.where(id: scope.fuzzysearch(filter.q)).or(scope.where(id: scope.emailsearch(filter.q)))
        end
        scope = scope.fuzzysearch(filter.name) if filter.name.present?
        scope = scope.with_roles(filter.roles) if filter.roles.present?

        return scope if sort_field.blank?

        scope.order({ sort_field.underscore => sort_order || 'desc' })
      end
    end
  end
end
