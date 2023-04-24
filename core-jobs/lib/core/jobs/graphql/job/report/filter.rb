# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          class Filter < ::Core::Base::GraphQL::BaseInputObject
            description 'job report filter'

            argument :report_name, String, required: true, description: 'name of the report'
          end
        end
      end
    end
  end
end
