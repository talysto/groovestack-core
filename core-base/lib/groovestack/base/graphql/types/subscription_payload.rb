# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Types
        class SubscriptionPayload < ::Groovestack::Base::GraphQL::Base::Object
          field :event, ::GraphQL::Types::JSON, null: false
          field :subscription, String, null: false
          field :subscription_args, ::GraphQL::Types::JSON, null: false
        end
      end
    end
  end
end
