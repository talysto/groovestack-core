module Core
  module Webhooks
    module Handlers
      class Stripe < Core::Webhooks::Handler
        extend Dry::Configurable

        setting :events, reader: true do 
          setting :handlers, default: {
            'account.external_account.created' => ::Core::Webhooks::StripeJob::Account::ExternalAccountCreated,
            'account.external_account.updated' => ::Core::Webhooks::StripeJob::Account::ExternalAccountUpdated,
            'customer.source.updated' => ::Core::Webhooks::StripeJob::Customer::SourceUpdated,
            'payout.failed' => ::Core::Webhooks::StripeJob::Payout::Failed,
            'payout.paid' => ::Core::Webhooks::StripeJob::Payout::Paid
          }
        end

        setting :api_key, reader: true

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

        def perform
          # ensure_livemode!

          if (event_handler = self.class.events.handlers[stripe_event.type.to_s])
            # TODO: don't assume event handlers are jobs
            event_handler.perform_later(webhook_event)
          else
            ::Rails.logger.error "No handler for Stripe #{stripe_event.type} event"
          end
        end

        protected

        def stripe_event
          @stripe_event ||= Stripe::Webhook.construct_event(
            webhook_event.data,
            webhook_event.headers['HTTP_STRIPE_SIGNATURE'],
            self.class.api_key
          )
        end
      end
    end
  end
end