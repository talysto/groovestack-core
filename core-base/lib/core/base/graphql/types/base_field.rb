module Core
  module Base
    module GraphQL
      module Types
        class BaseField < ::GraphQL::Schema::Field
          argument_class BaseArgument
      
          def initialize(*args, null: false, camelize: false, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            super
          end
        end
      end
    end
  end
end