class Core::Webhooks::Controllers::EventController < ApplicationController
  skip_forgery_protection raise: false

  Core::Webhooks.enabled_providers.each do |provider|
    define_method(provider) do
      handler = Core::Webhooks.event_handlers[provider.to_sym].new(request)
      handler.ensure_authentic!

      if handler.duplicate?
        logger.error "Duplicate #{provider} webhook received #{handler.webhook_event.data}."
        head :ok
        return
      end

      handler.webhook_event.save!

      handler.perform

      return if performed?
      head :ok
    end
  end
end