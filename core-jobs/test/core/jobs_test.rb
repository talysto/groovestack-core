# frozen_string_literal: true

require 'test_helper'

# NativeQueJob is a simple Job for testing
class NativeQueJob < Que::Job
  self.run_at = proc { Time.now + 10  } # 10 seconds
  self.priority = 10 # Linux priority scale - lower runs first

  def run(_param1)
    puts "Running #{self.class} / #{param1}"
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
    def test_that_it_has_a_version_number
      refute_nil ::Core::Jobs::VERSION
    end

    def test_tests_work
      assert true
    end

    def test_a_simple_job_runs
      Que::Job.run_synchronously = true
      NativeQueJob.enqueue('ok')
    end
  end
end
