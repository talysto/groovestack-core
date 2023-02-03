module Core 
  module Accounting
    module GraphQL
      module Types
        class Line < ::GraphQL::Schema::Object
          description 'A double entry line'

          field :id, ID, null: false

          field :partner, ::Core::Accounting::GraphQL::Types::Line, null: true
        end

        class LineListMetadata < ::GraphQL::Schema::Object
          field :count, Int, null: false
        end
      end
    end
  end
end