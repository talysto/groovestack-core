module Core 
  module Notifications
    class Global < Notification 
      validates :to_id, absence: true
      validates :to_scope, presence: true

      validates :read_at, absence: true
      validates :actions, absence: true
      validates :action_response, absence: true

      def add_to_read_bloom!(id)
        return false if read_bloom.include?(id)

        read_bloom = [*read_bloom, id]
        update!(read_bloom: read_bloom)
      end
    end
  end
end