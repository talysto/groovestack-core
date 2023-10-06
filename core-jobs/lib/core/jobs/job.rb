# frozen_string_literal: true

module Core
  module Jobs
    class Job < QueJobExt
      # https://github.com/que-rb/que/blob/528f17175454b0e24cb5e1bafd6cb4b72a038f92/lib/que/active_record/model.rb

      scope :completed , -> { where(status: :completed) }
      scope :completed_before, ->(time = 1.day.ago) { completed.where('finished_at < ?', time) }

      def self.purge(job_scope = :completed_before) # scope name or custom query. default is completed_before 1.day.ago
        ::QueJob.where(id: (respond_to?(job_scope) ? send(job_scope) : where(job_scope)).select(:id)).delete_all
      end

      def retry!
        QueJob.update(id, run_at: Time.now, expired_at: nil)
      end

      def run_now!
        retry!
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
