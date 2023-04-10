module Core
  module Jobs
    module GraphQL
      module Filters
        class JobFilter < Types::BaseInputObject
          # graphql_name "CORE-Job-filter"

          description 'job filter props'

          argument :q, String, required: false
          argument :ids, [ID], required: false
          argument :status, String, required: false
        end

        class JobReportFilter < Types::BaseInputObject
          description 'job report filters'

          argument :report_name, String, required: true
        end

        class LockerFilter < Types::BaseInputObject
          description 'que locker filter props'

          argument :ids, [ID], required: false
        end
      end
    end
  end
end
