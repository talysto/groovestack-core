# frozen_string_literal: true

module Core
  module Comments
    module GraphQL
      module Queries
        extend ActiveSupport::Concern

        included do
          include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

          react_admin_resource :comments, core_namespace: 'Comments'
        end

        def comments_base_scope
          ::Core::Comments::Comment.all
        end

        def comments_scope(sort_field: nil, sort_order: nil, filter: {})
          scope = comments_base_scope
          scope = scope.where(id: filter.ids) if filter.ids.present?
          scope = scope.where(author_id: filter.author_id) if filter.author_id.present?
          scope = scope.where(author_type: filter.author_type) if filter.author_type.present?
          scope = scope.where(resource_id: filter.resource_id) if filter.resource_id.present?
          scope = scope.where(resource_type: filter.resource_type) if filter.resource_type.present?
          scope = scope.where('created_at >= ?', filter.created_at_gte) if filter.created_at_gte.present?
          scope = scope.where('created_at <= ?', filter.created_at_lte) if filter.created_at_lte.present?
          scope = scope.where('body ilike ?', "%#{filter.q}%") if filter.q.present?

          return scope if sort_field.blank?

          # support sort by association attrs
          association, sort_field = sort_field.split('.') if sort_field.include?('.')
          # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

          scope.order({ sort_field.underscore => sort_order || 'desc' })
        end
      end
    end
  end
end
