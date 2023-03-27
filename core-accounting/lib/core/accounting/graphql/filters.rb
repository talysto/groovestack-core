module Core
  module Accounting
    module GraphQL
      module Filters
        class LineFilter < ::GraphQL::Schema::InputObject
          argument_class ::GraphQL::Schema::Argument

          description 'line filter props'

          argument :q, String, required: false
          argument :ids, [ID], required: false
          argument :code, [String], required: false
          argument :scope, [String], required: false
        end
      end
    end
  end
end
