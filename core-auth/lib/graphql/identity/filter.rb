# frozen_string_literal: true

module GraphQL
  module Identity
    class Filter < ::Groovestack::Base::GraphQL::BaseInputObject
      description 'Identity filter props'

      argument :ids, [ID], required: false

      argument :user_id, ID, required: false
    end
  end
end
