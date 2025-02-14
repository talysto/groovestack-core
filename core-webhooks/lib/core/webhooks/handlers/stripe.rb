module Core
  module Webhooks
    module Handlers
      class Stripe < Core::Webhooks::Handler
        extend Dry::Configurable
        REQUIRED_CREDENTIALS = [:STRIPE_WEBHOOK_SIGNING_SECRET].freeze

        def self.handles?(webhook_event)
          webhook_event.headers['HTTP_STRIPE_SIGNATURE'].present?
        end

        def ensure_authentic!
          stripe_event.present?
        rescue => e
          raise ::Core::Webhooks::UnverifiedWebhookError, e
        end

        def augment_webhook_event
          webhook_event.event = stripe_event.type
        end

        def duplicate?
          event = webhook_event.data['id']

          ::Core::Webhooks::Event.where(source: :stripe).where("data->>'id' = ?", event).size.positive?
        end

        protected

        def stripe_event
          @stripe_event ||= ::Stripe::Webhook.construct_event(
            raw_request_data,
            webhook_event.headers['HTTP_STRIPE_SIGNATURE'],
            Rails.application.credentials.send(self.class.required_credentials.first)
          )
        end
      end
    end
  end
end