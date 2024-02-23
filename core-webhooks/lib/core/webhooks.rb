# frozen_string_literal: true
require 'aasm'
require 'dry-configurable'
require 'wisper/activerecord'

require_relative "webhooks/version"
require_relative "webhooks/railtie" if defined?(Rails)

module Core
  module Webhooks
    autoload :Event, 'core/webhooks/event'
    autoload :Handler, 'core/webhooks/handler'

    module Handlers
      extend ActiveSupport::Autoload

      eager_autoload do
        autoload :Shopify, 'core/webhooks/handlers/shopify'
        autoload :Stripe, 'core/webhooks/handlers/stripe'
      end
    end
    
    module GraphQL
      module Event 
        autoload :Type, 'core/webhooks/graphql/event/type'
        autoload :Filter, 'core/webhooks/graphql/event/filter'
        autoload :Queries, 'core/webhooks/graphql/event/queries'
      end
    end 

    module Controllers
      autoload :EventController, 'core/webhooks/controllers/event_controller'
    end

    extend Dry::Configurable

    setting :routes_scope, reader: true
    setting :disabled_handlers, default: [], reader: true
    setting :handler_credentials, reader: true do 
      setting :shopify, reader: true do 
        setting :webhook_secret, reader: true
      end
      setting :stripe, reader: true do 
        setting :api_key, reader: true
      end
    end
    setting :unhandled_webhook_action, reader: true, default: :raise # :raise, :log, :persist
    setting :webhooks_listeners, reader: true do 
      setting :namespace, reader: true, default: 'webhooks_event_listeners'
      setting :process_event_method, reader: true, default: :process_event
    end

    class WebhooksError < StandardError; end
    class UnverifiedWebhookError < WebhooksError; end
  end
end
