module Core
  module Webhooks
    def self.enabled_handlers
      ::Core::Webhooks::Handler.descendants.reject { |h| disabled_handlers.include?(h.provider.to_sym) }
    end

    def self.handler_for(webhook_event, raw_request_data)
      handler = enabled_handlers.find { |h| h.handles?(webhook_event) }
      handler&.new(webhook_event, raw_request_data)
    end

    class Handler 
      attr_reader :webhook_event
      attr_accessor :raw_request_data

      def initialize(webhook_event, raw_request_data)
        webhook_event.source = self.class.provider
        @webhook_event = webhook_event
        @raw_request_data = raw_request_data
      end

      def self.handles?(_webhook_event)
        raise 'Not implemented'
      end

      def self.provider
        name.split('::').last.downcase
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
    end
  end
end