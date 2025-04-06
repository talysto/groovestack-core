# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Providers
        module ReactAdmin
          module Types
            class RAListMetadata < ::GraphQL::Schema::Object
              field :count, Int, null: false, description: Documentation::Fields.relation_count
            end
          end
        end
      end
    end
  end
end
