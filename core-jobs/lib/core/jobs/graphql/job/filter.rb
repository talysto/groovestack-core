# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'job filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :status, [String], required: false, description: 'Statuses to include'
          argument :type, [String], required: false, description: 'Types to include'
        end
      end
    end
  end
end
