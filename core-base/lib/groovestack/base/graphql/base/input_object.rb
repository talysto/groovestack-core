# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class InputObject < ::GraphQL::Schema::InputObject
          argument_class ::Groovestack::Base::GraphQL::Base::Argument
        end
      end
    end
  end
end
