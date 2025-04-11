# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class Subscription < ::GraphQL::Schema::Subscription
          argument_class ::Groovestack::Base::GraphQL::Base::Argument
          field_class ::Groovestack::Base::GraphQL::Base::Field
          object_class ::Groovestack::Base::GraphQL::Base::Object
        end
      end
    end
  end
end
