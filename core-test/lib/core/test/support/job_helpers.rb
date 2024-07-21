# frozen_string_literal: true

module JobHelpers
  def self.set_queue_adapter(adapter = :inline, &block)
    old_adapter = ActiveJob::Base.queue_adapter
    ActiveJob::Base.queue_adapter = adapter

    block.call # run test

    ActiveJob::Base.queue_adapter = old_adapter
  end

  def self.run_inline_jobs(&)
    set_queue_adapter(:inline, &)
  end
end
