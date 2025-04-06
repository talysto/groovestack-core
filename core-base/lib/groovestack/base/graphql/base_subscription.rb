# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      class BaseSubscription < ::GraphQL::Schema::Subscription
        argument_class ::Groovestack::Base::GraphQL::Types::BaseArgument
        field_class ::Groovestack::Base::GraphQL::Types::BaseField
        object_class ::Groovestack::Base::GraphQL::Types::BaseObject
      end
    end
  end
end
