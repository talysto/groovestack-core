module Core 
  module Notifications
    class Simple < Notification 
      validates :to_id, presence: true
      validates :to_scope, absence: true
      # validates :read_at, presence: true, on: :update

      belongs_to :to,  polymorphic: true

      def permitted_update!(**attrs)
        update!(attrs.slice(:read_at))
      end
    end
  end
end