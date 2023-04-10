# frozen_string_literal: true

module Core
  module Accounting
    module GraphQL
      module Filters
        class LineFilter < Types::BaseInputObject
          description 'line filter props'

          argument :account, [String], required: false
          argument :code, [String], required: false
          argument :ids, [ID], required: false
          argument :q, String, required: false
          argument :scope, [String], required: false
        end
      end
    end
  end
end
