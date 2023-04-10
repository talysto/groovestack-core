# frozen_string_literal: true

module Queries
  module OrgUnit
    extend ActiveSupport::Concern

    included do
      field :org_unit, Types::OrgUnitType, null: true, resolver_method: :OrgUnit, description: 'Find OrgUnit.' do
        argument :id, ::GraphQL::Types::ID, required: true
      end

      field :all_org_units, type: [Types::OrgUnitType], null: false, resolver_method: :org_units do
        argument :page, ::GraphQL::Types::Int, required: false
        argument :per_page, ::GraphQL::Types::Int, required: false
        argument :sort_field, ::GraphQL::Types::String, required: false
        argument :sort_order, ::GraphQL::Types::String, required: false
        argument :filter, Types::Filters::OrgUnitFilter, required: false
      end

      field :_all_org_units_meta, type: Types::ListMetadataType, camelize: false, null: true,
                                  resolver_method: :org_units_meta do
        argument :page, ::GraphQL::Types::Int, required: false
        argument :per_page, ::GraphQL::Types::Int, required: false
        argument :sort_field, ::GraphQL::Types::String, required: false
        argument :sort_order, ::GraphQL::Types::String, required: false
        argument :filter, Types::Filters::OrgUnitFilter, required: false
      end
    end

    def OrgUnit(id:)
      org_units_base_scope.find(id)
    end

    def org_units_meta(_page: nil, _per_page: nil, **attrs)
      { count: org_units_scope(**attrs).size }
    end

    def org_units_base_scope
      ::OrgUnit.all
    end

    def org_units_scope(sort_field: nil, sort_order: nil, filter: {})
      scope = org_units_base_scope
      scope = scope.where(id: filter.ids) unless filter.ids.nil?

      return scope if sort_field.blank?

      scope.order({ sort_field.underscore => sort_order || 'desc' })
    end
  end
end
