# frozen_string_literal: true

module GraphQL
  module OrgUnit
    class Type < ::Core::Base::GraphQL::Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :parent, GraphQL::OrgUnit::Type, null: true
    end
  end
end
