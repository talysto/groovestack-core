module Core
  module Base
    module GraphQL
      module Helpers
        module Types 
          module StatusEventVirtualAttributes
            def all_events
              object.class.aasm.events.map { |event| event.name.to_s }
            end
  
            def permitted_events
              object.aasm.events(permitted: true).map { |event| event.name.to_s }
            end
  
            def status_events
              all = all_events
              permitted = permitted_events
  
              all.map do |event|
                { name: event.titleize, key: event, enabled: permitted.include?(event) }
              end
            end
          end
        end
        module Mutations
          module StatusEvents
            def trigger_status_event!(obj:, attrs:, event:, args: nil, authorization_policy: nil)
              # NOTE: args spread requires keys to be symbols, but by default they are passed as strings. This is why we use `symbolize_keys` here
              raise ::GraphQL::ExecutionError, 'event not present' unless event.present?

              event = event.gsub("!", '').to_sym

              raise ::GraphQL::ExecutionError, 'Cannot update multiple attributes when firing instance methods' if attrs.present?
              raise ::GraphQL::ExecutionError, "#{event.capitalize} unavailable" unless obj.aasm.events.map(&:name).include?(event.to_sym)
              raise ::GraphQL::ExecutionError, "Unauthorized not allowed to #{event} this #{obj.class}" unless authorization_policy.nil? || authorization_policy.permitted_aasm_events.include?(event.to_sym)

              event = "#{event}!".to_sym

              if args.present? && args.is_a?(Array)
                obj.send("#{event}", *args)
              elsif args.present? && args.is_a?(Hash)
                obj.send("#{event}", **args.symbolize_keys!)
              else
                obj.send("#{event}")
              end
            end
          end
          module InstanceMethods
            def trigger_instance_method!(obj:, attrs:, instance_method:, args: nil, authorization_policy: nil)
              raise GraphQL::ExecutionError, 'instance_method not present' unless instance_method.present?
              raise GraphQL::ExecutionError, 'Cannot update multiple attributes when triggering instance method' if attrs.present?
              raise ::GraphQL::ExecutionError, "Unauthorized not allowed to trigger #{instance_method} for this #{obj.class}" unless authorization_policy.nil? || authorization_policy.permitted_instance_methods.include?(instance_method.to_sym)

              if args.present? && args.is_a?(Array)
                obj.send("#{instance_method}", *args)
              elsif args.present? && args.is_a?(Hash)
                obj.send("#{instance_method}", **args)
              else
                obj.send("#{instance_method}")
              end
            end
          end
        end
      end
    end
  end
end