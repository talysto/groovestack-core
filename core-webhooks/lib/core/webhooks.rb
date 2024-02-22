# frozen_string_literal: true
require 'aasm'
require 'dry-configurable'

require_relative "webhooks/version"
require_relative "webhooks/railtie" if defined?(Rails)

module Core
  module Webhooks
    autoload :Event, 'core/webhooks/event'
    autoload :Handler, 'core/webhooks/handler'

    module GraphQL
      module Event 
        autoload :Type, 'core/webhooks/graphql/event/type'
        autoload :Filter, 'core/webhooks/graphql/event/filter'
        autoload :Queries, 'core/webhooks/graphql/event/queries'
      end
    end 

    module StripeJob
      module Account
        autoload :ExternalAccountCreated, 'core/webhooks/stripe_job/account'
        autoload :ExternalAccountUpdated, 'core/webhooks/stripe_job/account'
      end
    
      module Customer
        autoload :SourceUpdated, 'core/webhooks/stripe_job/customer'
      end
    
      module Payout
        autoload :Failed, 'core/webhooks/stripe_job/payout'
        autoload :Paid, 'core/webhooks/stripe_job/payout'
      end
    end

    module Handlers
      autoload :Shopify, 'core/webhooks/handlers/shopify'
      autoload :Stripe, 'core/webhooks/handlers/stripe'
    end

    module Controllers
      autoload :EventController, 'core/webhooks/controllers/event_controller'
    end

    extend Dry::Configurable

    setting :routes_scope, default: 'webhooks', reader: true
    setting :event_handlers, default: {
      shopify: Core::Webhooks::Handlers::Shopify,
      stripe: Core::Webhooks::Handlers::Stripe,
    }, reader: true
    setting :enabled_providers, default: [:stipe, :shopify], reader: true

    class WebhooksError < StandardError; end
    class UnverifiedWebhookError < WebhooksError; end
  end
end
