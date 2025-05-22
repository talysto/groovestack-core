# frozen_string_literal: true

module GraphQL
  module User
    class Filter < ::Groovestack::Base::GraphQL::Base::InputObject
      description 'User filter props'

      argument :ids, [ID], required: false
      argument :q, String, required: false

      argument :name, String, required: false
      argument :roles, [String], required: false
    end
  end
end
