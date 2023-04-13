# frozen_string_literal: true

module Core
  module Accounting
    module GraphQL
      module Line
        module Queries
          extend ActiveSupport::Concern

          included do
            include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

            react_admin_resource :lines, graphql_path: "Core::Accounting::GraphQL"
          end

          def lines_base_scope
            ::DoubleEntry::Line.all
          end

          def lines_scope(sort_field: nil, sort_order: nil, filter: {})
            scope = lines_base_scope
            scope = scope.where(id: filter.ids) unless filter.ids.nil?
            scope = scope.where(code: filter.code) unless filter.code.nil?
            scope = scope.where(scope: filter.scope) unless filter.scope.nil?
            scope = scope.where(scope: filter.account) unless filter.account.nil?

            return scope if sort_field.blank?

            scope.order({ sort_field.underscore => sort_order || 'desc' })
          end
        end
      end
    end
  end
end
