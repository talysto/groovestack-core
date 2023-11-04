# frozen_string_literal: true

module GraphQL
  module Identity
    module Queries
      extend ActiveSupport::Concern

      included do
        include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

        react_admin_resource :identities #, graphql_path: "GraphQL"
      end
  
      def identities_scope(sort_field: nil, sort_order: nil, filter: {})
        scope = ::Identity.all
        scope = scope.where(id: filter.ids) if filter.ids.present?
        scope = scope.where(user_id: filter.user_id) if filter.user_id.present?

        return scope unless sort_field.present?

        scope.order({ sort_field.underscore => sort_order || 'desc' })
      end
    end
  end
end

