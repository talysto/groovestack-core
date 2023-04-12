# frozen_string_literal: true

module Queries
  module OrgUnit
    extend ActiveSupport::Concern

    included do
      react_admin_resource :org_units
    end

    def org_units_scope(sort_field: nil, sort_order: nil, filter: {})
      scope = org_units_base_scope
      scope = scope.where(id: filter.ids) unless filter.ids.nil?

      return scope if sort_field.blank?

      scope.order({ sort_field.underscore => sort_order || 'desc' })
    end
  end
end
