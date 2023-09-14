# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          module Queries
            extend ActiveSupport::Concern

            included do
              include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

              # special case for virtual class. pass custom graphql_type and graphql_filter paths
              react_admin_resource :job_reports, graphql_type: 'Core::Jobs::GraphQL::Job::Report::Type',
                                                 graphql_filter: 'Core::Jobs::GraphQL::Job::Report::Filter',
                                                 except: [:find]
            end

            def job_reports_scope(_sort_field: nil, _sort_order: nil, filter: {})
              return [job_stats] if filter.report_name == 'job_stats'

              return [jobs_by_period(filter)] if filter.report_name == 'jobs_by_period'

              raise 'unrecognized job report_name'
            end

            def jobs_by_period(filter)
              scope = Core::Jobs::Job.unscoped

              scope = scope.where(updated_at: filter.start_at..filter.end_at) if filter.start_at.present?
              scope = scope.where(status: filter.status) if filter.status.present?
              if filter.group_by_period.present?
                scope = scope.group([:status, "date_trunc('#{filter.group_by_period}', updated_at) as period"])
                scope = scope.order('period desc')
              end

              {
                id: :custom,
                data: scope.count.to_a
              }
            end

            def job_stats # rubocop:disable Metrics/MethodLength
              sql = <<-SQL.squish
                SELECT
                  job_class,
                  sub_class,
                  count(*)                    AS count,
                  count(lock_id)              AS count_working,
                  sum((error_count > 0)::int) AS count_errored,
                  max(error_count)            AS highest_error_count,
                  min(run_at)                 AS oldest_run_at

                FROM public.que_all
                WHERE#{' '}
                  finished_at IS NULL#{' '}
                  AND expired_at IS NULL
                GROUP BY job_class, sub_class
                ORDER BY count(*) DESC
              SQL

              sanitized_sql = ActiveRecord::Base.sanitize_sql_array([sql, {}])
              data = ActiveRecord::Base.connection.execute(sanitized_sql)

              {
                id: :job_stats,
                data: data.to_a
              }
            end
          end
        end
      end
    end
  end
end
