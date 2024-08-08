module Core
  module Activities
    module GraphQL
      module Activity
        module Queries
          extend ActiveSupport::Concern

          included do
            react_admin_resource :activities, graphql_path: 'GraphQL'
          end

          def activities_scope(base_scope: nil, sort_field: nil, sort_order: nil, filter: {})
            scope = base_scope
            scope = scope.where(id: filter.ids) if filter.ids.present?
            scope = scope.where(type: filter.type) if filter.type.present?

            if filter.resource_id.present?
              r_id = filter.resource_id
              scope = scope.where(actor_id: r_id).or(scope.where(object_id: r_id).or(scope.where(target_id: r_id)))
            else
              if filter.actor_type.present? && filter.actor_id.present?
                scope = scope.where(actor_type: filter.actor_type, actor_id: filter.actor_id)
              end
              if filter.object_type.present? && filter.object_id.present?
                scope = scope.where(object_type: filter.object_type, object_id: filter.object_id)
              end
              if filter.target_type.present? && filter.target_id.present?
                scope = scope.where(target_type: filter.target_type, target_id: filter.target_id)
              end
            end

            return scope unless sort_field.present?

            scope.order({ sort_field.underscore => sort_order || 'desc' })
          end
        end
      end
    end
  end
end
