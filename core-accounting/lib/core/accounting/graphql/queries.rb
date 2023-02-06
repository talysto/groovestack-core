module Core
  module Accounting
    module GraphQL
      module Queries
        extend ActiveSupport::Concern

        include ::Core::GraphQL::Providers::ReactAdmin::Resource

        included do
          react_admin_resource :lines, core_namespace: 'Accounting'
        end

        def lines_scope(sort_field: nil, sort_order: nil, filter: {})
          scope = ::DoubleEntry::Line.all
          scope = scope.where(id: filter.ids) unless filter.ids.nil?

          return scope unless sort_field.present?

          association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
          # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

          scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
        end
      end
    end
  end
end