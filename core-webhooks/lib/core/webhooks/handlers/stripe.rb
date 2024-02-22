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

        protected

        def ensure_authentic!
          stripe_event.present? || super
        end

        def stripe_event
          @stripe_event ||= Stripe::Webhook.construct_event(
            request_data,
            request_headers['HTTP_STRIPE_SIGNATURE'],
            self.class.api_key
          )
        rescue Stripe::SignatureVerificationError => e
          logger.error e.inspect
          false
        end

        def duplicate?
          event = webhook_event.data['id']

          ::Core::Webhooks::Event.where("data->>'id' = ?", event).size.positive?
        end

        def webhook_event
          @webhook_event ||= ::Core::Webhooks::Event.new(
            source: :stripe,
            headers: request_headers,
            data: JSON.parse(request_data),
            event: stripe_event.type
          )
        end

        def perform
          # ensure_livemode!

          if (event_handler = self.class.events.handlers[stripe_event.type.to_s])
            # TODO: don't assume event handlers are jobs
            event_handler.perform_later(webhook_event)
          else
            logger.error "No handler for Stripe #{stripe_event.type} event"
          end
        end
      end
    end
  end
end