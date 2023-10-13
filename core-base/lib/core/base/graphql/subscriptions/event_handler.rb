module Core 
  module Base
    module GraphQL
      module Subscriptions
        class EventHandler
          def self.trigger(subscription, args, event, kwargs)
            triggered = false

            ::GraphQL::Schema.descendants.each do |schema|
              subscription_type = schema.types["Subscription"] || schema.types["SubscriptionType"]
              next unless subscription_type.present?
              next unless schema.get_fields(subscription_type).keys.include?(subscription.to_s)
              
              triggered = true
              schema.subscriptions.trigger(subscription, args, event, **kwargs)
            end
            
            puts 'app schema not defined' unless triggered
          end
        end
      end
    end
  end
end