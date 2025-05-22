# frozen_string_literal: true

module Groovestack
  module Auth
    module GraphQL
      class AuthorizedObject < ::Groovestack::Base::GraphQL::Base::Object
        field_class ::Groovestack::Auth::GraphQL::AuthorizedField
      end
    end
  end
end
