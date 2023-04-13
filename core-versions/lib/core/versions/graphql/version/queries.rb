# frozen_string_literal: true

module Core
  module Versions
    module GraphQL
      module Version
        module Queries
          extend ActiveSupport::Concern

          included do
            include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

            react_admin_resource :versions, graphql_path: "Core::Versions::GraphQL"
          end

          def versions_base_scope
            ::Core::Versions::Version.all
          end

          def versions_scope(sort_field: nil, sort_order: nil, filter: {})
            scope = versions_base_scope
            scope = scope.where(id: filter.ids) if filter.ids.present?
            scope = scope.where(whodunnit: filter.actor_id) if filter.actor_id.present?
            scope = scope.where(actor_type: filter.actor_type) if filter.actor_type.present?
            scope = scope.where(item_id: filter.item_id || filter.resource_id) if [filter.item_id,
                                                                                  filter.resource_id].compact.present?
            scope = scope.where(item_type: filter.item_type || filter.resource_type) if [filter.item_type,
                                                                                        filter.resource_type].compact.present? # rubocop:disable Layout/LineLength
            scope = scope.where('created_at >= ?', filter.created_at_gte) if filter.created_at_gte.present?
            scope = scope.where('created_at <= ?', filter.created_at_lte) if filter.created_at_lte.present?
            scope = scope.where('body ilike ?', "%#{filter.q}%") if filter.q.present?

            return scope if sort_field.blank?

            scope.order({ sort_field.underscore => sort_order || 'desc' })
          end
        end
      end
    end
  end
end
