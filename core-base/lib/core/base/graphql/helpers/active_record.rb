module Core
  module Base
    module GraphQL
      module Helpers
        module ActiveRecord
          module FireInstanceMethod
            def fire_instance_method!(obj, attrs, instance_method, args = {}, authorization_policy = nil)
              # NOTE: method currently requires instance_method to have named params if you want to pass args to it
              # NOTE: args spread requires keys to be symbols, but by default they are passed as strings. This is why we use `symbolize_keys` here
              raise ::GraphQL::ExecutionError, 'instance_method not present' unless instance_method.present?

              instance_method = instance_method.gsub("!", '').to_sym

              raise ::GraphQL::ExecutionError, 'Cannot update multiple attributes when firing instance methods' if attrs.present?
              raise ::GraphQL::ExecutionError, "#{instance_method.capitalize} not permitted" unless obj.aasm.events.map(&:name).include?(instance_method.to_sym)
              raise ::GraphQL::ExecutionError, "Unauthorized not allowed to #{instance_method} this #{obj.class}" unless authorization_policy.nil? || authorization_policy.permitted_aasm_events.include?(instance_method.to_sym)

              args = args.merge({ current_user: context[:current_user] }).symbolize_keys!
              instance_method = "#{instance_method}!".to_sym

              obj.send(instance_method, **args)
            end
          end
        end
      end
    end
  end
end