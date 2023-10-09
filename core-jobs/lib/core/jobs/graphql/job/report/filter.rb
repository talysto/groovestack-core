# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          class Filter < ::Core::Base::GraphQL::BaseInputObject
            description 'job report filter'

            argument :report_name, String, required: true, description: 'name of the report'

            # Jobs By Period Report
            argument :end_at, ::GraphQL::Types::ISO8601DateTime, required: false, description: 'end date'
            argument :group_by_period, String, required: false, description: 'Group by period'
            argument :start_at, ::GraphQL::Types::ISO8601DateTime, required: false, description: 'start date'
            argument :status, [String], required: false, description: 'Statuses to include'
          end
        end
      end
    end
  end
end
