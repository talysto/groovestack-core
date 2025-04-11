# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Types
        class Money < ::Groovestack::Base::GraphQL::Base::Object
          description 'A money object'

          field :amount, String, null: false, description: 'amount in decimal'
          field :currency, ::Groovestack::Base::GraphQL::Types::Currency, null: false, description: 'currency metadata'
          field :formatted_amount, String, null: false,
                                           description: 'amount in decimal formatted with currency symbol',
                                           method: :format

          def amount
            object.amount.to_s
          end
        end
      end
    end
  end
end
