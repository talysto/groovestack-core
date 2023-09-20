module Core 
  module Notifications
    class Task < Simple 
      validates :actions, presence: true
      # validates :action_response, presence: true, on: :update
      # validates :read_at, presence: true, on: :update

      def permitted_update!(**attrs)
        update!(**attrs.slice(:action_response, :read_at))
      end
    end
  end
end