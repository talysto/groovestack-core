module GraphQL
  module OrgUnit
    class Filter < ::Core::Base::GraphQL::BaseInputObject
      description 'org unit filter props'

      argument :ids, [ID], required: false
      argument :q, String, required: false
    end
  end
end