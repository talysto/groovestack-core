module Types
  class SubscriptionType < ::Core::Base::GraphQL::Types::BaseObject
    include ::Core::Jobs::GraphQL::Job::Subscriptions
  end
end