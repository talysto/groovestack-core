module Core
  module Webhooks
    def self.available_handlers
      # ensure all handlers are loaded to enable Core::Webhooks.handler_for method
      ::Core::Webhooks::Handlers.eager_load! unless ::Core::Webhooks::Handler.descendants.present?

      ::Core::Webhooks::Handler.descendants
    end

    def self.enabled_handlers
      available_handlers.select { |h| h.enabled? }
    end

    def self.configured_handlers
      enabled_handlers.select { |h| h.configured? }
    end

    def self.enabled_handlers_sans_configuration
      enabled_handlers - configured_handlers
    end

    def self.handler_for(webhook_event, raw_request_data)
      handler = configured_handlers.find { |h| h.handles?(webhook_event) }
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

      def self.required_credentials
        self.const_defined?(:REQUIRED_CREDENTIALS) ? self::REQUIRED_CREDENTIALS : []
      end

      def self.required_credentials_present?
        required_credentials.all? { |credential| Rails.application.credentials.send(credential).present? }
      end

      def self.enabled?
        !::Core::Webhooks.disabled_handlers.include?(provider.to_sym)
      end

      def self.configured?
        required_credentials_present?
      end
    end
  end
end