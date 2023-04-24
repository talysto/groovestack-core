# frozen_string_literal: true

module GraphQL
  module OrgUnit
    module Queries
      extend ActiveSupport::Concern

      included do
        react_admin_resource :org_units, graphql_path: "GraphQL"
      end

      def org_units_scope(sort_field: nil, sort_order: nil, filter: {})
        scope = org_units_base_scope
        scope = scope.where(id: filter.ids) unless filter.ids.nil?

        return scope if sort_field.blank?

        scope.order({ sort_field.underscore => sort_order || 'desc' })
      end
    end
  end
end
