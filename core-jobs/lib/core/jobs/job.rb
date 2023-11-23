# frozen_string_literal: true

module Core
  module Jobs
    class Job < QueJobExt
      # https://github.com/que-rb/que/blob/528f17175454b0e24cb5e1bafd6cb4b72a038f92/lib/que/active_record/model.rb

      scope :completed , -> { where(status: :completed) }
      scope :completed_before, ->(time = 1.day.ago) { completed.where('finished_at < ?', time) }

      def self.purge(ids=[], job_scope = :completed_before) # scope name or custom query. default is completed_before 1.day.ago
        ids = (ids.present? ? where(id: ids) : (respond_to?(job_scope) ? send(job_scope) : where(job_scope))).select(:id).map(&:id) # need to persist ids in memory before deleting them
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
        find_by(id: id) # override b/c no primary key on que_jobs_ext view
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
