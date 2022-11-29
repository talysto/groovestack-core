module Core
  module Jobs
    module GraphQL
      module Filters
        class JobFilter < ::GraphQL::Schema::InputObject
          # graphql_name "CORE-Job-filter"

          argument_class ::GraphQL::Schema::Argument

          description 'job filter props'
          argument :q, String, required: false
          argument :ids, [ID], required: false
          argument :status, String, required: false
        end

        class LockerFilter < ::GraphQL::Schema::InputObject
          # graphql_name "CORE-Job-filter"

          argument_class ::GraphQL::Schema::Argument

          description 'que locker filter props'
        end
      end
    end
  end
end