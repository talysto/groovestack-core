module Core 
  module Base 
    module GraphQL
      class BaseSubscription < ::GraphQL::Schema::Subscription
        argument_class ::Core::Base::GraphQL::Types::BaseArgument
        field_class ::Core::Base::GraphQL::Types::BaseField
        object_class ::Core::Base::GraphQL::BaseObject

        type ::Core::Base::GraphQL::Types::SubscriptionPayload, null: false
      end
    end
  end
end