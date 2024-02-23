module Core
  module Webhooks
    class Event < ActiveRecord::Base
      self.table_name = 'core_webhooks_events'
      
      include AASM
      include Wisper.model

      aasm column: :status, whiny_transitions: false, whiny_persistence: true do
        state :received, initial: true
        state :processed
    
        event :process do
          transitions from: :received, to: :processed
        end
      end
    end

    class EventSubscriber
      def after_create(webhook_event)
        listener_classname = "#{::Core::Webhooks.webhooks_listeners.namespace}/#{webhook_event.source}".camelize
        listener = "::#{listener_classname}".constantize
        listener.send(::Core::Webhooks.webhooks_listeners.process_event_method, webhook_event)
      rescue NoMethodError => e
        ::Rails.logger.error "Listener #{listener_classname} does not respond to process_event. Expected it to be defined but it was not."
      rescue NameError => e
        ::Rails.logger.error "No listener for received #{webhook_event.source} webhook #{webhook_event.event}. Expected #{listener_classname} to be defined but it was not."
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do 
  ::Core::Webhooks::Event.subscribe(::Core::Webhooks::EventSubscriber.new)
end