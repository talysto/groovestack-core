module Core 
  module Notifications
    class Global < Notification 
      validates :to_id, absence: true
      validates :to_scope, presence: true
      validates :to_type, presence: true

      validates :read_at, absence: true
      validates :actions, absence: true
      validates :action_response, absence: true

      def mark_as_read!(id:)
        return false if read_bloom.include?(id)

        read_bloom = [*read_bloom, id]
        update!(read_bloom: read_bloom)
      end

      def mark_as_unread!(id:)
        return false unless read_bloom.include?(id)

        read_bloom = read_bloom - [id]
        update!(read_bloom: read_bloom)
      end

      def to_records
        eval("#{to_type}.#{to_scope}")
      end
    end
  end
end