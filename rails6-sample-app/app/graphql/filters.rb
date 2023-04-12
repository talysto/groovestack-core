# frozen_string_literal: true

module Filters
  class OrgUnitFilter < ::GraphQL::Schema::InputObject
    argument_class ::GraphQL::Schema::Argument

    description 'org unit filter props'

    argument :ids, [ID], required: false
    argument :q, String, required: false
  end

  class UserFilter < ::GraphQL::Schema::InputObject
    argument_class ::GraphQL::Schema::Argument

    description 'user filter props'

    argument :ids, [ID], required: false
    argument :q, String, required: false
  end
end
