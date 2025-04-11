# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class Argument < ::GraphQL::Schema::Argument
          def initialize(*args, camelize: ::Groovestack::Base.config.graphql.camelize, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            super
          end
        end
      end
    end
  end
end
