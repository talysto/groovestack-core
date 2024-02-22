module Core
  module Webhooks
    class Handler 
      attr_reader :request

      def initialize(request)
        @request = request
      end

      protected

      def ensure_authentic!
        logger.error ["Error in #{params[:source]} webhook", request_headers, request_data,].join("\n")
        raise 'Could not verify webhook'
      end

      def duplicate?
        false
      end

      def perform
        raise 'Not implemented'
      end

      def request_data
        @request_data ||= request.body.read
      end
    
      def request_headers
        @request_headers ||= request.headers.to_h.select { |k, _v| k =~ /^HTTP_/ }
      end
    
      def webhook_event
        @webhook_event ||= ::Core::Webhooks::Event.new(
          source: params[:source],
          headers: request_headers,
          data: JSON.parse(request_data)
        )
      end
    end
  end
end