# frozen_string_literal: true

module GraphQL
  module User
    module Queries
      extend ActiveSupport::Concern

      included do
        include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

        react_admin_resource :users, graphql_path: "GraphQL"
      end

      def current_user
        context[:current_resource]
      end

      def find_user(id:)
        id == 'me' ? current_user : ::User.find(id)
      end
  
      def users_scope(sort_field: nil, sort_order: nil, filter: {})
        scope = ::User.all
        scope = scope.where(id: filter.ids) if filter.ids.present?
  
        scope = scope.where(id: scope.fuzzysearch(filter.q)).or(scope.where(id: scope.emailsearch(filter.q))) if filter.q.present?
        scope = scope.fuzzysearch(filter.name) if filter.name.present?
        scope = scope.with_roles(filter.roles) if filter.roles.present?
  
        return scope unless sort_field.present?
  
        sort_field = 'last_sign_in_at' if sort_field == 'last_login_at'
  
        scope.order({ sort_field.underscore => sort_order || 'desc' })
      end
    end
  end
end

