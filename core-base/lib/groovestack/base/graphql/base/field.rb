# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class Field < ::GraphQL::Schema::Field
          argument_class ::Groovestack::Base::GraphQL::Base::Argument

          attr_accessor :authenticate, :visibility_permission

          # rubocop:disable Metrics/ParameterLists
          def initialize(
            *args,
            authenticate: nil,
            visibility_permission: nil,
            null: false,
            camelize: ::Groovestack::Base.config.graphql.camelize,
            **kwargs, &block
          )
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            @authenticate = authenticate
            @visibility_permission = visibility_permission
            super(*args, null: null, camelize: camelize, **kwargs, &block)
          end
          # rubocop:enable Metrics/ParameterLists
        end
      end
    end
  end
end
