# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Authorization
        class AuthorizedObject < ::Groovestack::Base::GraphQL::Base::Object
          field_class ::Groovestack::Base::GraphQL::Authorization::AuthorizedField
        end
      end
    end
  end
end
