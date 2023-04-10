# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Filters
        class JobFilter < Types::BaseInputObject
          # graphql_name "CORE-Job-filter"

          description 'job filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :status, String, required: false, description: 'current status of job'
        end

        class JobReportFilter < Types::BaseInputObject
          description 'job report filters'

          argument :report_name, String, required: true, description: 'name of the report'
        end

        class LockerFilter < Types::BaseInputObject
          description 'que locker filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
        end
      end
    end
  end
end
