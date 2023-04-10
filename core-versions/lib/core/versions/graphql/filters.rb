# frozen_string_literal: true

module Core
  module Versions
    module GraphQL
      module Filters
        class VersionFilter < Types::BaseInputObject
          description 'version filter props'

          argument :actor_id, ID, required: false, description: 'id of actor relation'
          argument :actor_type, String, required: false, description: 'class of actor relation'
          argument :created_at_gte, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.created_at_gte
          argument :created_at_lte, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.created_at_lte
          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :item_id, ID, required: false, description: 'id of item relation'
          argument :item_type, String, required: false, description: 'class of item relation'
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :resource_id, ID, required: false, description: 'id of resource relation'
          argument :resource_type, String, required: false, description: 'class of resource relation'
        end
      end
    end
  end
end
