module Core
  module Jobs
    module GraphQL
      module JobQueries
        extend ActiveSupport::Concern

        included do
          field :Job, ::Core::Job::GraphQL::JobType, null: true, resolver_method: :job do
            argument :id, ::GraphQL::Types::Base::Object::ID, required: true
          end

          field_with_filter_pagination_sort :allJobs, type: [::Core::Job::GraphQL::JobType], filter_type: ::Core::Job::GraphQL::JobFilter, null: false, resolver_method: :jobs

          # use Admin::Types::ListMetadata b/c jobs are only used acessed by admin
          field_with_filter_pagination_sort :_allJobsMeta, type: ::Admin::Types::ListMetadata, filter_type: ::Core::Job::GraphQL::JobFilter, camelize: false, null: true, resolver_method: :jobs_meta
        end

        def job(id:)
          ::Core::Job.find id
        end

        def jobs(page: nil, per_page: nil, **attrs)
          scope = jobs_scope(attrs)
          scope = scope.page(page + 1).per(per_page) if page.present?
          scope
        end

        def jobs_meta(page: nil, per_page: nil, **attrs) # rubocop:disable Lint/UnusedMethodArgument
          { count: jobs_scope(attrs).count }
        end

        def jobs_scope(sort_field: nil, sort_order: nil, filter: {})
          scope = ::Core::Job.unscoped
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