# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          class Type < ::Core::Base::GraphQL::BaseObject
            description 'a job report'

            field :data, ::GraphQL::Types::JSON, null: false, description: ''
            field :id, String, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.id
          end
        end
      end
    end
  end
end
