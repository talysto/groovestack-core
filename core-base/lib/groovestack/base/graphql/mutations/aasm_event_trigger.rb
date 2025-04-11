# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Mutations
        module AASMEventTrigger
          def trigger_status_event!(obj:, attrs:, event:, args: nil, authorization_policy: nil) # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
            # NOTE: args spread requires keys to be symbols, but by default
            # they are passed as strings. This is why we use `symbolize_keys` here
            raise ::GraphQL::ExecutionError, 'event not present' if event.blank?

            event = event.gsub('!', '').to_sym

            if attrs.present?
              raise ::GraphQL::ExecutionError,
                    'Cannot update multiple attributes when firing instance methods'
            end
            unless obj.aasm.events.map(&:name).include?(event)
              raise ::GraphQL::ExecutionError,
                    "#{event.capitalize} unavailable"
            end
            unless authorization_policy.nil? || authorization_policy.permitted_aasm_events.include?(event)
              raise ::GraphQL::ExecutionError,
                    "Unauthorized not allowed to #{event} this #{obj.class}"
            end

            event = :"#{event}!"

            if args.present? && args.is_a?(Array)
              obj.send(event.to_s, *args)
            elsif args.present? && args.is_a?(Hash)
              obj.send(event.to_s, **args.symbolize_keys!)
            else
              obj.send(event.to_s)
            end
          end
        end
      end
    end
  end
end
