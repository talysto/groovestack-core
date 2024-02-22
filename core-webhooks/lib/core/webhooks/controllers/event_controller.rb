class Core::Webhooks::Controllers::EventController < ApplicationController
  skip_forgery_protection raise: false

  def webhook
    handler = Core::Webhooks.handler_for(webhook_event)

    unless handler.present?
      # always save webhook event even if unhandled
      logger.error "No handler for received webhook #{webhook_event.data}."
      webhook_event.source = :unknown
      webhook_event.save!

      head :ok
      return
    end

    handler.ensure_authentic!

    if handler.duplicate?
      # don't persist duplicate events
      logger.error "Duplicate #{handler.provider} webhook received #{webhook_event.data}."

      head :ok
      return
    end

    handler.augment_webhook_event
    handler.webhook_event.save!

    handler.perform

    # return if performed?
    head :ok

  rescue ::Core::Webhooks::UnverifiedWebhookError => e
    logger.error ["Unverified Webhook Error:", e, request_headers, request_data,].join("\n")
    
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