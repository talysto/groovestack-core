# frozen_string_literal: true

module Core
  module Comments
    module GraphQL
      module Filters
        class CommentFilter < Types::BaseInputObject
          description 'comment filter props'

          argument :author_id, ID, required: false, description: 'id of author relation'
          argument :author_type, String, required: false, description: 'class of author relation'
          argument :created_at_gte, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.created_at_gte
          argument :created_at_lte, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.created_at_lte
          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :resource_id, ID, required: false, description: 'id of resource relation'
          argument :resource_type, String, required: false, description: 'class of resource relation'
        end
      end
    end
  end
end
