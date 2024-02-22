module Core
  module Webhooks
    def self.handler_for(webhook_event)
      handler = ::Core::Webhooks::Handler.descendants.find { |h| h.handles?(webhook_event) }
      handler&.new(webhook_event)
    end

    class Handler 
      attr_reader :webhook_event
      attr_accessor :request_data, :request_headers

      def initialize(webhook_event)
        webhook_event.source = provider
        @webhook_event = webhook_event
      end

      def self.handles?(_webhook_event)
        raise 'Not implemented'
      end

      def augment_webhook_event
        true
      end

      def ensure_authentic!
        raise 'Not implemented'
      end

      def duplicate?
        false
      end

      def perform
        raise 'Not implemented'
      end

      protected

      def provider
        self.class.name.split('::').last.downcase
      end
    end
  end
end