module Core
  module Jobs
    class Job < Que::ActiveRecord::Model
      scope :failed, -> { where.not(expired_at: nil).where.not(error_count: 0) }
      scope :scheduled, -> { where("run_at > ?", Time.now.utc) }
      scope :complete, -> { where.not(finished_at: nil) }
      scope :running, -> { where("run_at <= ?", Time.now.utc).where(finished_at: nil).where(expired_at: nil) }
      scope :errored, -> { where.not(error_count: 0) }
      scope :expired, -> { where.not(expired_at: nil) }
    end
  end
end