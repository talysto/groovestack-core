# frozen_string_literal: true

module Core
  module Jobs
    class Job < QueJobExt
      # https://github.com/que-rb/que/blob/528f17175454b0e24cb5e1bafd6cb4b72a038f92/lib/que/active_record/model.rb

      def retry!
        QueJob.update(id, run_at: Time.now, expired_at: nil)
      end

      def run_now!
        retry
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
