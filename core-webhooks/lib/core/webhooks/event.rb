module Core
  module Webhooks
    class Event < ActiveRecord::Base
      self.table_name = 'core_webhooks_events'
      
      include AASM

      aasm column: :status, whiny_transitions: false, whiny_persistence: true do
        state :received, initial: true
        state :processed
    
        event :process do
          transitions from: :received, to: :processed
        end
      end
    end
  end
end