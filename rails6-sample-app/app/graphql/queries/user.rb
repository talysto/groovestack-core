module Queries 
  module User 
    extend ActiveSupport::Concern

    included do
      field :User, Types::UserType, null: true, resolver_method: :User, description: "Find User." do
        argument :id, ::GraphQL::Types::ID, required: true
      end

      field :allUsers, type: [Types::UserType], null: false, resolver_method: :users do
        argument :page, ::GraphQL::Types::Int, required: false
        argument :per_page, ::GraphQL::Types::Int, required: false
        argument :sort_field, ::GraphQL::Types::String, required: false
        argument :sort_order, ::GraphQL::Types::String, required: false
        argument :filter, Types::Filters::UserFilter, required: false
      end

      field :_allUsersMeta, type: Types::ListMetadataType, camelize: false, null: true, resolver_method: :users_meta do
        argument :page, ::GraphQL::Types::Int, required: false
        argument :per_page, ::GraphQL::Types::Int, required: false
        argument :sort_field, ::GraphQL::Types::String, required: false
        argument :sort_order, ::GraphQL::Types::String, required: false
        argument :filter, Types::Filters::UserFilter, required: false
      end
    end

    def User(id:)
      users_base_scope.find(id)
    end

    def users(page: nil, per_page: nil, **attrs)
      scope = users_scope(attrs)
      scope = scope.offset(page * per_page).limit(per_page) if page.present?
      scope
    end

    def users_meta(page: nil, per_page: nil, **attrs)
      { count: org_units_scope(attrs).size }
    end

    def users_base_scope
      ::User.all
    end

    def users_scope(sort_field: nil, sort_order: nil, filter: {})
      scope = users_base_scope
      scope = scope.where(id: filter.ids) unless filter.ids.nil?

      return scope unless sort_field.present?

      association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
      # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

      scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
    end

  end
end
