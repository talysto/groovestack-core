# frozen_string_literal: true

module GraphQL
  module UserExtensions
    extend ActiveSupport::Concern

    included do
      # devise fields
      field :last_login_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'last login in at',
                                                               method: :last_sign_in_at
      field :sign_in_count, Integer, null: true, description: 'sign in count'
    end
  end
end
