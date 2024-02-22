require 'base64'
require 'openssl'
require 'active_support/security_utils'

module Core
  module Webhooks
    module Handlers
      class Shopify < Core::Webhooks::Handler
        extend Dry::Configurable

        setting :events, reader: true do 
          setting :handlers, default: {

          }
        end

        setting :webhook_secret, reader: true

        def self.shopify_headers
          OpenStruct.new(
            hmac_sha256: 'HTTP_X_SHOPIFY_HMAC_SHA256',
            webhook_id: 'HTTP_X_SHOPIFY_WEBHOOK_ID',
            webhook_topic: 'HTTP_X_SHOPIFY_TOPIC'
          )
        end

        def self.handles?(webhook_event)
          webhook_event.headers[shopify_headers.hmac_sha256].present?
        end

        def ensure_authentic!
          calculated_hmac = ::Base64.strict_encode64(::OpenSSL::HMAC.digest('sha256', self.class.webhook_secret, request_data))
          verified = ::ActiveSupport::SecurityUtils.secure_compare(calculated_hmac, hmac_header)

          raise ::Core::Webhooks::UnverifiedWebhookError, "Invalid HMAC for Shopify webhook" unless verified

          verified
        end

        def duplicate?          
          matches = ::Core::Webhooks::Event.where(source: :shopify).where("headers->>'HTTP_X_SHOPIFY_WEBHOOK_ID' = ?", webhook_id)
          matches.present?
        end

        def augment_webhook_event
          webhook_event.event = event_type
        end

        def perform
          # ensure_livemode!

          if (event_handler = self.class.events.handlers[event_type])
            # TODO: don't assume event handlers are jobs
            event_handler.perform_later(webhook_event)
          else
            ::Rails.logger.error "No handler for Shopify #{event_type} event"
          end
        end

        protected

        def hmac_header
          webhook_event.headers[self.class.shopify_headers.hmac_sha256]
        end

        def webhook_id
          webhook_event.headers[self.class.shopify_headers.webhook_id]
        end

        def event_type
          webhook_event.headers[self.class.shopify_headers.webhook_topic]
        end
      end
    end
  end
end