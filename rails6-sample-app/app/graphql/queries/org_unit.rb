module Queries 
  module OrgUnit 
    extend ActiveSupport::Concern

    included do
      field :OrgUnit, Types::OrgUnitType, null: true, resolver_method: :OrgUnit, description: "Find OrgUnit." do
        argument :id, ::GraphQL::Types::ID, required: true
      end

      field :allOrgUnits, type: [Types::OrgUnitType], null: false, resolver_method: :org_units do
        argument :page, ::GraphQL::Types::Int, required: false
        argument :per_page, ::GraphQL::Types::Int, required: false
        argument :sort_field, ::GraphQL::Types::String, required: false
        argument :sort_order, ::GraphQL::Types::String, required: false
        argument :filter, Types::Filters::OrgUnitFilter, required: false
      end

      field :_allOrgUnitsMeta, type: Types::ListMetadataType, camelize: false, null: true, resolver_method: :org_units_meta do
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

    def org_units(page: nil, per_page: nil, **attrs)
      scope = org_units_scope(**attrs)
      scope = scope.offset(page * per_page).limit(per_page) if page.present?
      scope
    end

    def org_units_meta(page: nil, per_page: nil, **attrs)
      { count: org_units_scope(**attrs).size }
    end

    def org_units_base_scope
      ::OrgUnit.all
    end

    def org_units_scope(sort_field: nil, sort_order: nil, filter: {})
      scope = org_units_base_scope
      scope = scope.where(id: filter.ids) unless filter.ids.nil?

      return scope unless sort_field.present?

      association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
      # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

      scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
    end

  end
end
