# frozen_string_literal: true

module Core
  module Jobs
    class Job < QueJobExt
      # https://github.com/que-rb/que/blob/528f17175454b0e24cb5e1bafd6cb4b72a038f92/lib/que/active_record/model.rb

      scope :completed , -> { where(status: :completed) }
      scope :completed_before, ->(time = 1.day.ago) { completed.where('finished_at < ?', time) }
      scope :completed_one_hour_ago, -> { completed_before(1.hour.ago) }

      def self.purge(ids=[], job_scope = :completed_before)
        # job_scope can be the name of a predefined scope or a relation

        # need to persist ids in memory before deleting them b/c can't delete via Core::Jobs::Job (which has a view as a table)
        ids = (
                ids.present? ? 
                  where(id: ids) 
                  : job_scope.is_a?(ActiveRecord::Relation) ? 
                      job_scope
                      : job_scope.present? && respond_to?(job_scope) ? 
                          send(job_scope) 
                          : none
              ).select(:id).map(&:id) 

        ::Core::Jobs::QueJob.where(id: ids).delete_all

        ids
      end

      def retry!
        ::Core::Jobs::QueJob.update(id, run_at: Time.now, expired_at: nil)
      end

      def run_now!
        retry!
      end

      def self.find(id)
        # NOTE: override b/c no primary key on que_jobs_ext view

        # TODO: this should work with ActiveRecord::Relation as well
        find_by(id: id)
      end

      def actions
        actions = []
        actions << :retry if error_count.positive?
        actions << :run_now if status == :scheduled
        actions << :delete if status != :running
        actions
      end
    end
  end
end
