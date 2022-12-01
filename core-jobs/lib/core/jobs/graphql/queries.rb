module Core
  module Jobs
    module GraphQL
      module Queries
        extend ActiveSupport::Concern
        
        include ::Core::GraphQL::Providers::ReactAdmin::Resource

        included do
          react_admin_resource :jobs, core_namespace: 'Jobs'
          react_admin_resource :lockers, core_namespace: 'Jobs'
          react_admin_resource :job_reports, core_namespace: 'Jobs', except: [:find, :collection_meta]
          # field :allJobReports, [::Core::Jobs::GraphQL::Types::JobReport], null: false, resolver_method: :job_stats
        end

        def jobs_scope(sort_field: nil, sort_order: nil, filter: {})
          scope = ::Core::Jobs::Job.unscoped
          scope = scope.where(id: filter.ids) unless filter.ids.nil?
          # scope = scope.where(type: filter.type) if filter.type.present?
          scope = scope.where("(args->0)->>'job_class' ilike ?", "%#{filter.q}%") if filter.q.present?
          scope = scope.send(filter.status) if filter.status.present? && ['failed', 'scheduled', 'complete', 'running', 'errored', 'expired'].include?(filter.status)

          return scope unless sort_field.present?

          association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
          # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

          scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
        end

        def lockers_scope(sort_field: nil, sort_order: nil, filter: {})
          scope = ::Core::Jobs::Locker.unscoped

          return scope unless sort_field.present?

          association, sort_field = sort_field.split('.') if sort_field.include?('.') # support sort by association attrs
          # return scope.left_joins(association.to_sym).merge(association.camelize.constantize.order(Hash[sort_field.underscore, sort_order || 'desc'])) if association.present?

          scope.order(Hash[sort_field.underscore, sort_order || 'desc'])
        end

        def job_reports_scope(sort_field: nil, sort_order: nil, filter: {})
          return [job_stats] if filter.report_name == 'job_stats'

          raise 'unrecognized job report_name'
        end

        def job_stats
          sql = <<-SQL
            SELECT
              job_class,
              sub_class,
              count(*)                    AS count,
              count(lock_id)              AS count_working,
              sum((error_count > 0)::int) AS count_errored,
              max(error_count)            AS highest_error_count,
              min(run_at)                 AS oldest_run_at

            FROM public.que_all
            WHERE 
              finished_at IS NULL 
              AND expired_at IS NULL
            GROUP BY job_class, sub_class
            ORDER BY count(*) DESC
          SQL

          sanitized_sql = ActiveRecord::Base.sanitize_sql_array([sql, {}])
          data = ActiveRecord::Base.connection.execute(sanitized_sql)

          {
            data: data.to_a
          }
        end
      end
    end
  end
end