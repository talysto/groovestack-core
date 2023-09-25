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

              field :JobReport, ::Core::Jobs::GraphQL::Job::Report::Type, null: true, resolver_method: :show_job_report, description: 'Build job report' do
                argument :id, String, required: true
                argument :meta, ::Core::Jobs::GraphQL::Job::Report::BuildParamsType, required: false
              end
            end
    
            def show_job_report(id:, meta: nil)
              filter = meta&.dig(:params, :filter)

              return jobs_kpis if id == 'jobs_kpis'
              return jobs_by_period(filter) if id == 'jobs_by_period'
              return jobs_by_type if id == 'jobs_by_type'
              return job_stats if id == 'job_stats'

              raise 'unrecognized job report_name'
            end

            def job_reports_scope(_sort_field: nil, _sort_order: nil, filter: {})
              return [jobs_kpis] if filter.report_name == 'jobs_kpis'
              return [jobs_by_period(filter)] if filter.report_name == 'jobs_by_period'
              return [jobs_by_type] if filter.report_name == 'jobs_by_type'
              return [job_stats] if filter.report_name == 'job_stats'

              raise 'unrecognized job report_name'
            end

            def jobs_kpis
              sql = <<-SQL.squish
                SELECT
                  count(*) FILTER(where status='scheduled') as scheduled
                  , count(*) FILTER(where status='queued') as queued
                  , count(*) FILTER(where status='running') as running
                  , count(*) FILTER(where status='failed') as failed
                  , count(*) FILTER(where status='errored') as errored
                  , count(*) FILTER(where status='complete') as complete
                  , min(run_at) FILTER(where status in ('queued', 'running')) as oldest_queued
                  , ( SELECT sum(worker_count) FROM que_lockers ) as workers
                                  
                FROM que_jobs_ext jobs 
              SQL

              sanitized_sql = ActiveRecord::Base.sanitize_sql_array([
                sql, 
                {}
              ])
              data = ActiveRecord::Base.connection.execute(sanitized_sql)

              {
                id: :jobs_kpis,
                data: data.to_a
              }
            end

            def jobs_by_period(filter)
              sql = <<-SQL.squish
              
                with range as (
                  select generate_series(
                    date_trunc(:range_type, :start_at::timestamp) - :look_back_interval::interval,
                    date_trunc(:range_type, :end_at::timestamp) + :look_forward_interval::interval,
                    :interval::interval
                  ) as period
                )
                
                select 
                  range.period                
                  , count(*) FILTER(where status='scheduled') as scheduled
                  , count(*) FILTER(where status='queued') as queued
                  , count(*) FILTER(where status='running') as running
                  , count(*) FILTER(where status='failed') as failed
                  , count(*) FILTER(where status='errored') as errored
                  , count(*) FILTER(where status='complete') as complete
                  
                FROM range
                
                LEFT JOIN que_jobs_ext jobs 

                ON date_trunc(:range_type, jobs.updated_at::timestamp) = range.period
                
                GROUP BY period
                ORDER BY period
              SQL
              
              range_type = filter.group_by_period || 'minute'

              sanitized_sql = ActiveRecord::Base.sanitize_sql_array([
                sql, 
                { 
                  start_at: (filter.start_at ? Time.zone.parse(filter.start_at.to_s) : Time.zone.now).utc, 
                  end_at: (filter.end_at ? Time.zone.parse(filter.end_at.to_s) : Time.zone.now).utc,
                  range_type: range_type,
                  interval: "1 #{range_type}",
                  look_back_interval: range_type == 'minute' ? '1 hour' : "1 #{range_type}",
                  look_forward_interval: range_type == 'minute' ? '1 hour' : "1 #{range_type}",
                }
              ])
              data = ActiveRecord::Base.connection.execute(sanitized_sql)

              {
                id: :jobs_by_period,
                data: data.to_a
              }
            end

            def jobs_by_type
              sql = <<-SQL.squish
                select 
                  job_class   
                  , sub_class           
                  , count(*) FILTER(where status='scheduled') as scheduled
                  , count(*) FILTER(where status='queued') as queued
                  , count(*) FILTER(where status='running') as running
                  , count(*) FILTER(where status='failed') as failed
                  , count(*) FILTER(where status='errored') as errored
                  , count(*) FILTER(where status='complete') as complete
                                  
                FROM que_jobs_ext jobs 
                
                GROUP BY job_class, sub_class
                ORDER BY job_class, sub_class -- TODO: make parametric
              SQL
              
              sanitized_sql = ActiveRecord::Base.sanitize_sql_array([
                sql, 
                {}
              ])
              data = ActiveRecord::Base.connection.execute(sanitized_sql)

              {
                id: :jobs_by_type,
                data: data.to_a
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

                FROM que_jobs_ext
                WHERE
                  finished_at IS NULL
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