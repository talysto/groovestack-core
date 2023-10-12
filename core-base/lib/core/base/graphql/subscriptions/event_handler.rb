module Core 
  module Base
    module GraphQL
      module Subscriptions
        class EventHandler
          def self.trigger(subscription, args, event, kwargs)
            triggered = false

            ::Rails.logger.info "GraphQL subscription trigger request: #{subscription}, #{args}, #{event}, #{kwargs}"

            ::GraphQL::Schema.descendants.each do |schema|
              subscription_type = schema.types["Subscription"]
              next unless subscription_type.present?
              next unless schema.get_fields(subscription_type).keys.include?(subscription.to_s)
              
              triggered = true
              schema.subscriptions.trigger(subscription, args, event, **kwargs)

              ::Rails.logger.info "GraphQL subscription trigger success: #{subscription}, #{args}, #{event}, #{kwargs}"
            end
            
            raise 'app schema not defined' unless triggered
          end
        end
      end
    end
  end
end