module Types
  module Filters
    class OrgUnitFilter < ::GraphQL::Schema::InputObject
      argument_class ::GraphQL::Schema::Argument

      description 'org unit filter props'

      argument :q, String, required: false
      argument :ids, [ID], required: false
    end

    class UserFilter < ::GraphQL::Schema::InputObject
      argument_class ::GraphQL::Schema::Argument

      description 'user filter props'

      argument :q, String, required: false
      argument :ids, [ID], required: false
    end
  end
end
