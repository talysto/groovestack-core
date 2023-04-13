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
              react_admin_resource :job_reports, graphql_type: "Core::Jobs::GraphQL::Job::Report::Type", graphql_filter: "Core::Jobs::GraphQL::Job::Report::Filter", except: [:find]
            end

            def job_reports_scope(sort_field: nil, sort_order: nil, filter: {})
              return [job_stats] if filter.report_name == 'job_stats'

              raise 'unrecognized job report_name'
            end

            def job_stats
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
