# frozen_string_literal: true

module GraphQL
  module User
    class Filter < ::Core::Base::GraphQL::BaseInputObject
      description 'user filter props'

      argument :ids, [ID], required: false
      argument :q, String, required: false
    end
  end
end
