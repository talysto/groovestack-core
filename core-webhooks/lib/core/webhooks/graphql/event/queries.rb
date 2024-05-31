module Core
  module Webhooks
    module GraphQL
      module Event
        module Queries
          extend ActiveSupport::Concern

          included do
            react_admin_resource :webhook_events, class_name: 'Core::Webhooks::Event', graphql_type: 'Core::Webhooks::GraphQL::Event::Type', graphql_filter: 'Core::Webhooks::GraphQL::Event::Filter'
          end

          def webhook_events_scope(base_scope: nil, sort_field: nil, sort_order: nil, filter: {})
            scope = base_scope
            scope = scope.where(id: filter.ids) if filter.ids.present?
            scope = scope.where(source: filter.source) if filter.source.present?
            scope = scope.where(event: filter.event) if filter.event.present?
            scope = scope.where(status: filter.status) if filter.status.present?

            scope = scope.where('source ilike ? OR event ilike ?', "#{filter.q}%", "#{filter.q}%") if filter.q.present?

            return scope unless sort_field.present?

            scope.order({ sort_field.underscore => sort_order || 'desc' })
          end
        end
      end
    end
  end
end
