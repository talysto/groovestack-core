# frozen_string_literal: true

class CreateOrReplaceQueAllView < ActiveRecord::Migration[6.0]
  def change
    reversible do |dir|
      dir.up do
        safety_assured do # requirement for strong_migrations
          # https://dba.stackexchange.com/questions/586/cant-rename-columns-in-postgresql-views-with-create-or-replace
          execute <<-SQL.squish
            DROP VIEW IF EXISTS public.que_all CASCADE;
          SQL

          execute <<-SQL.squish
            CREATE VIEW public.que_all AS
              SELECT
                que_jobs.*
                , locks.id as lock_id
                , que_lockers.pid
                , que_lockers.worker_count
                , que_lockers.worker_priorities
                , que_lockers.ruby_pid
                , que_lockers.ruby_hostname
                , que_lockers.queues
                , que_lockers.listening
                , args->0->>'job_class' as sub_class
            #{'    '}
              FROM public.que_jobs#{' '}
            #{'    '}
              LEFT JOIN (
                SELECT#{' '}
                  (classid::bigint << 32) + objid::bigint AS id, *
                FROM pg_locks
                WHERE locktype = 'advisory'
              ) locks USING (id)
            #{'  '}
              LEFT JOIN public.que_lockers ON locks.pid = que_lockers.pid
          SQL
        end
      end

      dir.down do
        execute <<-SQL.squish
          DROP VIEW IF EXISTS public.que_all;
        SQL
      end
    end
  end
end
