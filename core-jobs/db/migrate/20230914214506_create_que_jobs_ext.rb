# frozen_string_literal: true

class CreateQueJobsExt < ActiveRecord::Migration[6.0]
  def change
    reversible do |dir|
      dir.up do
        safety_assured do # requirement for strong_migrations
          execute <<-SQL
            CREATE OR REPLACE VIEW public.que_jobs_ext
            AS
            SELECT
                locks.id AS lock_id,
                locks.pid as que_locker_pid,
                (que_jobs.args -> 0) ->> 'job_class'::text AS sub_class,
                greatest(run_at, expired_at, finished_at) as updated_at,

                case
                  when locks.id is not null then 'running'
                  when finished_at is not null then 'complete'
                  when expired_at is not null then 'failed'
                  when error_count > 0 then 'errored'
                  when run_at < now() then 'queued'
                  else 'scheduled'
                end as status,

                -- que_jobs.*:
                que_jobs.id,
                que_jobs.priority,
                que_jobs.run_at,
                que_jobs.job_class,
                que_jobs.error_count,
                que_jobs.last_error_message,
                que_jobs.queue,
                que_jobs.last_error_backtrace,
                que_jobs.finished_at,
                que_jobs.expired_at,
                que_jobs.args,
                que_jobs.data,
                que_jobs.kwargs,
                que_jobs.job_schema_version

              FROM que_jobs
                LEFT JOIN (
                  SELECT
                    (classid::bigint << 32) + objid::bigint AS id
                    , pid
                      FROM  pg_locks
                      WHERE pg_locks.locktype = 'advisory'::text) locks USING (id);
          SQL
        end
        
        # NOTE: adding index below threw
        # PG::WrongObjectType: ERROR:  "que_jobs_ext" is not a table or materialized view

        # Caused by:
        # ActiveRecord::StatementInvalid: PG::WrongObjectType: ERROR:  "que_jobs_ext" is not a table or materialized view

        # add_index 'que_jobs_ext', %w[status updated_at], name: 'que_jobs_ext_status_period'
      end

      dir.down do
        # remove_index 'que_jobs_ext_status_period'

        execute <<-SQL.squish
          DROP VIEW IF EXISTS public.que_jobs_ext;
        SQL
      end
    end
  end
end

# DROP VIEW public.que_;

# ALTER TABLE public.que_jobs_ext
#     OWNER TO pguser;
