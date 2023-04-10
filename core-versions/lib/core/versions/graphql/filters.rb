# frozen_string_literal: true

module Core
  module Versions
    module GraphQL
      module Filters
        class VersionFilter < Types::BaseInputObject
          description 'version filter props'

          argument :actor_id, ID, required: false
          argument :actor_type, String, required: false
          argument :created_at_gte, String, required: false
          argument :created_at_lte, String, required: false
          argument :ids, [ID], required: false
          argument :item_id, ID, required: false
          argument :item_type, String, required: false
          argument :q, String, required: false
          argument :resource_id, ID, required: false
          argument :resource_type, String, required: false
        end
      end
    end
  end
end
