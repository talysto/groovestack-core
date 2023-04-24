# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Locker
          class Filter < ::Core::Base::GraphQL::BaseInputObject
            description 'que locker filter props'

            argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          end
        end
      end
    end
  end
end
