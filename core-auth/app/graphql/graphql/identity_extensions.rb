module GraphQL
  module IdentityExtensions
    extend ActiveSupport::Concern

    included do
      field :omniauth_data, ::GraphQL::Types::JSON, null: true, description: 'omniauth data'
    end
  end
end