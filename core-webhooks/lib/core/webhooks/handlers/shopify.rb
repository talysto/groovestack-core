module Core
  module Webhooks
    module Handlers
      class Shopify < Core::Webhooks::Handler
        extend Dry::Configurable

        setting :events, reader: true do 
          setting :handlers
        end

        setting :api_key, reader: true

        def self.handles?(webhook_event)
          # TODO: implement
        end

        protected

        def ensure_authentic!
          # TODO: implement
          super
        end

        def augment_webhook_event
          # TODO: implement
        end

        def duplicate?
          # TODO: implement
          
          event = webhook_event.data['id']

          ::Core::Webhooks::Event.where.(source: :shopify).where("data->>'id' = ?", event).size.positive?
        end

        def perform
          # TODO: implement

          # ensure_livemode!

          # if (event_handler = self.class.events.handlers[stripe_event.type.to_s])
          #   # TODO: don't assume event handlers are jobs
          #   event_handler.perform_later(webhook_event)
          # else
          #   logger.error "No handler for Stripe #{stripe_event.type} event"
          # end
        end
      end
    end
  end
end