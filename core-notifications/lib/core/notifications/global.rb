module Core 
  module Notifications
    class Global < Notification 
      validates :to_id, absence: true
      validates :to_scope, presence: true

      validates :read_at, absence: true
      validates :actions, absence: true
      validates :action_response, absence: true

      def permitted_update!(**attrs)
        to_id = attrs[:to_id]
        read_bloom = [*read_bloom, to_id]
        update!(read_bloom: read_bloom)
      end
    end
  end
end