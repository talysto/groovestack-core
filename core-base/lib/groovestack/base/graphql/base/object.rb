# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class Object < ::GraphQL::Schema::Object
          field_class ::Groovestack::Base::GraphQL::Base::Field
        end
      end
    end
  end
end
