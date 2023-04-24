# frozen_string_literal: true

require 'test_helper'
require 'que/active_record/model'

# NativeQueJob is a simple Job for testing
class NativeQueJob < Que::Job
  self.priority = 10 # Linux priority scale - lower runs first

  def run(param1)
    # puts "#{self.class} / #{param1}"
  end
end

class FutureJob < Que::Job
  self.run_at = proc { Time.zone.now + 1 } # 10 seconds

  def run(param1)
    # puts "#{self.class} / #{param1}"
  end
end

# class BasicApplicationJob < ApplicationJob
#   queue_as :default
#   priority 50

#   def perform(*params)
#     puts "Running #{self.class} / #{self.params}"
#   end
# end

# class BasicInstantJob < ApplicationJob
#   queue_as :instant
#   priority 50

#   def perform(*params)
#     puts "Running #{self.class} / #{self.params}"
#   end
# end

module Core
  # Main CORE::Jobs test suite
  class JobsTest < Minitest::Test
    def setup
      Que::ActiveRecord::Model.destroy_all
    end

    def test_that_it_has_a_version_number
      assert_not_nil ::Core::Jobs::VERSION
    end

    def test_tests_work
      assert true
    end

    def test_jobs_enqueue
      # Que::Job.run_synchronously = true
      NativeQueJob.enqueue('ok')
      assert Que::ActiveRecord::Model.count == 1
    end

    def test_jobs_run
      Que::Job.run_synchronously = true
      NativeQueJob.enqueue('ok')
      assert Que::ActiveRecord::Model.count.zero?
      Que::Job.run_synchronously = false
    end
  end
end
