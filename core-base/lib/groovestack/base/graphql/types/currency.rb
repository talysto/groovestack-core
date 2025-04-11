# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Types
        class Currency < ::Groovestack::Base::GraphQL::Base::Object
          description 'A currency object'

          field :code, String, null: false, description: 'currency code', method: :iso_code
          field :symbol, String, null: false, description: 'currency symbol'
        end
      end
    end
  end
end
