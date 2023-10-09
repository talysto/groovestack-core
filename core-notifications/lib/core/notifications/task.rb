module Core 
  module Notifications
    class Task < Simple 
      validates :actions, presence: true
      # validates :action_response, presence: true, on: :update
      # validates :read_at, presence: true, on: :update

      def mark_as_complete!(action_response:)
        update!(action_response: action_response)
        mark_as_read!
      end
    end
  end
end