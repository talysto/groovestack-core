# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Types
        module AASMEventAttributes
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
    end
  end
end
