# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Mutations
        module MethodTrigger
          def trigger_instance_method!(obj:, attrs:, instance_method:, args: nil, authorization_policy: nil) # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
            raise GraphQL::ExecutionError, 'instance_method not present' if instance_method.blank?

            instance_method = instance_method.to_sym

            raise ::GraphQL::ExecutionError, 'instance_method undefined' unless obj.respond_to?(instance_method)

            if attrs.present?
              raise ::GraphQL::ExecutionError,
                    'Cannot update multiple attributes when triggering instance method'
            end
            unless authorization_policy.nil? || authorization_policy.permitted_instance_methods.include?(instance_method) # rubocop:disable Layout/LineLength
              raise ::GraphQL::ExecutionError,
                    "Unauthorized not allowed to trigger #{instance_method} for this #{obj.class}"
            end

            if args.present? && args.is_a?(Array)
              obj.send(instance_method.to_s, *args)
            elsif args.present? && args.is_a?(Hash)
              obj.send(instance_method.to_s, **args.symbolize_keys!)
            else
              obj.send(instance_method.to_s)
            end
          end
        end
      end
    end
  end
end
