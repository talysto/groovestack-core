module Core 
  module Notifications
    class Simple < Notification 
      validates :to_id, presence: true
      validates :to_scope, absence: true
      # validates :read_at, presence: true, on: :update

      belongs_to :to,  polymorphic: true

      def mark_as_read!
        update!(read_at: Time.zone.now)
      end

      def mark_as_unread!
        update!(read_at: nil)
      end
    end
  end
end