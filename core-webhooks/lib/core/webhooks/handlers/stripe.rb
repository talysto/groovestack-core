module Core
  module Webhooks
    module Handlers
      class Stripe < Core::Webhooks::Handler
        extend Dry::Configurable

        def self.handles?(webhook_event)
          webhook_event.headers['HTTP_STRIPE_SIGNATURE'].present?
        end

        def ensure_authentic!
          stripe_event.present?
        rescue e 
          raise ::Core::Webhooks::UnverifiedWebhookError, e
        end

        def augment_webhook_event
          webhook_event.event = stripe_event.type
        end

        def duplicate?
          event = webhook_event.data['id']

          ::Core::Webhooks::Event.where.(source: :stripe).where("data->>'id' = ?", event).size.positive?
        end

        protected

        def stripe_event
          @stripe_event ||= Stripe::Webhook.construct_event(
            webhook_event.data,
            webhook_event.headers['HTTP_STRIPE_SIGNATURE'],
            ::Core::Webhooks.handler_credentials.stripe.api_key
          )
        end
      end
    end
  end
end