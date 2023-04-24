# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'job filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :status, String, required: false, description: 'current status of job'
        end
      end
    end
  end
end
