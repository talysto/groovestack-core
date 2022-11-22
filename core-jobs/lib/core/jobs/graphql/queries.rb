module Core
  module Jobs
    module GraphQL
      module Queries
        module Job
          extend ActiveSupport::Concern
          include ::Core::GraphQL::ResourceProviders::ReactAdmin

          included do
            ra_resource :jobs
          end

          def jobs_scope(sort_field: nil, sort_order: nil, filter: {})
            scope = ::Core::Jobs::Job.unscoped
            scope = scope.where(id: filter.ids) unless filter.ids.nil?
            # scope = scope.where(type: filter.type) if filter.type.present?
            scope = scope.where("serialized_params->>'job_class' ilike ?", "%#{filter.q}%") if filter.q.present?
            scope = scope.send(filter.status) if filter.status.present? && ['failed', 'scheduled', 'complete', 'running'].include?(filter.status)

            return scope unless sort_field.present?

            association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
            # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

            scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
          end
        end
      end
    end
  end
end