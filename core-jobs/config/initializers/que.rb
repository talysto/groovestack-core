# frozen_string_literal: true

# override default of 15
Que::Job.maximum_retry_count = 5

Que::Job.class_eval do
  def default_resolve_action
    # prevents default deletion of complete jobs
    finish
  end
end
