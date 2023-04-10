# frozen_string_literal: true

module Core
  module Jobs
    class Job < Que::ActiveRecord::Model
      # https://github.com/que-rb/que/blob/528f17175454b0e24cb5e1bafd6cb4b72a038f92/lib/que/active_record/model.rb

      # scope :errored,     -> { where(t[:error_count].gt(0)) }
      # scope :not_errored, -> { where(t[:error_count].eq(0)) }

      # scope :expired,     -> { where(t[:expired_at].not_eq(nil)) }
      # scope :not_expired, -> { where(t[:expired_at].eq(nil)) }

      # scope :finished,     -> { where(t[:finished_at].not_eq(nil)) }
      # scope :not_finished, -> { where(t[:finished_at].eq(nil)) }

      # scope :scheduled,     -> { where(t[:run_at].gt  (Arel.sql("now()"))) }
      # scope :not_scheduled, -> { where(t[:run_at].lteq(Arel.sql("now()"))) }

      # scope :ready,     -> { not_errored.not_expired.not_finished.not_scheduled }
      # scope :not_ready, -> { where(t[:error_count].gt(0).or(t[:expired_at].not_eq(nil)).or(t[:finished_at].not_eq(nil)).or(t[:run_at].gt(Arel.sql("now()")))) }

      scope :failed, -> { errored.expired }
      scope :running, -> { not_expired.not_finished.not_scheduled } # should this exclude errored jobs?

      def actions
        return [:retry] if error_count.positive?

        []
      end

      def status
        now = Time.zone.now

        return :scheduled if run_at > now
        return :finished if finished_at.present?

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
