module Core
  module Base
    module GraphQL
      module Helpers
        module ActiveRecord
          module FireInstanceMethod
            def fire_instance_method!(obj, attrs, instance_method, args = {})
              # NOTE: method currently requires instance_method to have named params if you want to pass args to it
              # NOTE: args spread requires keys to be symbols, but by default they are passed as strings. This is why we use `symbolize_keys` here
              raise ::GraphQL::ExecutionError, 'instance_method not present' unless instance_method.present?
              raise ::GraphQL::ExecutionError, 'Cannot update multiple attributes when firing instance methods' if attrs.present?

              if args.present?
                obj.send(instance_method, **args.symbolize_keys!)
              else
                obj.send(instance_method)
              end
            end
          end
        end
      end
    end
  end
end