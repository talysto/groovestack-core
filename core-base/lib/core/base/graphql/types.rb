module Core
  module Base
    module GraphQL
      module Types
        class BaseArgument < ::GraphQL::Schema::Argument
          def initialize(*args, camelize: false, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            super
          end
        end

        class BaseField < ::GraphQL::Schema::Field
          argument_class BaseArgument

          def initialize(*args, null: false, camelize: false, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            super
          end
        end

        class SubscriptionPayload < ::GraphQL::Schema::Object
          field :subscription, String, null: false
          field :event, ::GraphQL::Types::JSON, null: false
          field :subscription_args, ::GraphQL::Types::JSON, null: true
        end
      end
    end
  end
end