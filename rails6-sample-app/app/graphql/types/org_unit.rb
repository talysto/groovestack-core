# frozen_string_literal: true

module Types
  class OrgUnit < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :parent, Types::OrgUnit, null: true
  end
end
