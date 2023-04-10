# frozen_string_literal: true

module Core
  module Accounting
    module GraphQL
      module Filters
        class LineFilter < Types::BaseInputObject
          description 'line filter props'

          argument :account, [String], required: false, description: ''
          argument :code, [String], required: false, description: ''
          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :scope, [String], required: false, description: ''
        end
      end
    end
  end
end
