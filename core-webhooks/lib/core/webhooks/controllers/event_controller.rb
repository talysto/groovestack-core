module Core
  module Webhooks
    module Controllers
      class EventController < ActionController::Base # ApplicationController
        skip_forgery_protection raise: false

        def create
          handler = Core::Webhooks.handler_for(webhook_event, request_data)

          unless handler.present?
            if ::Core::Webhooks.unhandled_webhook_action == :raise
              raise ::Core::Webhooks::UnverifiedWebhookError, "No handler for received webhook."
            elsif ::Core::Webhooks.unhandled_webhook_action == :log
              ::Rails.logger.error "No handler for received webhook #{[request_headers, request_data].join("\n")}."
            elsif ::Core::Webhooks.unhandled_webhook_action == :persist
              webhook_event.source = :unknown
              webhook_event.save!
            end

            head :ok
            return
          end

          handler.ensure_authentic!
          handler.confirm_subscription! if handler.respond_to?(:confirm_subscription!) && handler.respond_to?(:subscribe_event?) && handler.subscribe_event? 

          if handler.duplicate?
            # don't persist duplicate events
            ::Rails.logger.error "Duplicate #{handler.provider} webhook received #{webhook_event.data}."

            head :ok
            return
          end

          handler.augment_webhook_event
          handler.webhook_event.save!

          head :ok

        rescue ::Core::Webhooks::UnverifiedWebhookError => e
          ::Rails.logger.error ["Unverified Webhook Error:", e, request_headers, request_data,].join("\n")
          
          raise e
        end

        protected

        def request_data
          @request_data ||= request.body.read
        end

        def request_headers
          @request_headers ||= request.headers.to_h.select { |k, _v| k =~ /^HTTP_/ }
        end

        def webhook_event
          @webhook_event ||= ::Core::Webhooks::Event.new(
            headers: request_headers,
            data: JSON.parse(request_data)
          )
        end
      end
    end
  end
end