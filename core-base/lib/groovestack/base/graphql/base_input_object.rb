# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      class BaseInputObject < ::GraphQL::Schema::InputObject
        argument_class ::Groovestack::Base::GraphQL::Types::BaseArgument
      end
    end
  end
end
