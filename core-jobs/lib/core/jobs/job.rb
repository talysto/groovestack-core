module Core
  module Jobs
    class Job < Que::ActiveRecord::Model
      scope :failed, -> { where.not(expired_at: nil).where.not(error_count: 0) }
      scope :scheduled, -> { where("run_at > ?", Time.now.utc) }
      scope :complete, -> { where.not(finished_at: nil) }
      scope :running, -> { where("run_at <= ?", Time.now.utc).where(finished_at: nil).where(expired_at: nil) }
      scope :errored, -> { where.not(error_count: 0) }
      scope :expired, -> { where.not(expired_at: nil) }

      def status
        now = Time.zone.now

        return :scheduled if run_at > now
        return :complete if finished_at.present?
        if expired_at.present?
          return :failed if error_count.positive?
          return :expired
        end

        return :errored if error_count.positive?
        return :running if run_at <= now
      end
    end
  end
end