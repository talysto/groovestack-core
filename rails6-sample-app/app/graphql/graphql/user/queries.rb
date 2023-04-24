# frozen_string_literal: true

module GraphQL
  module User
    module Queries
      extend ActiveSupport::Concern

      included do
        react_admin_resource :users, graphql_path: "GraphQL"
      end

      def users_scope(sort_field: nil, sort_order: nil, filter: {})
        scope = users_base_scope
        scope = scope.where(id: filter.ids) unless filter.ids.nil?

        return scope if sort_field.blank?

        association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
        # return scope.left_joins(association.to_sym)
        # .merge(association.camelize.constantize
        # .order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

        scope.order({ sort_field.underscore => sort_order || 'desc' })
      end
    end
  end
end
