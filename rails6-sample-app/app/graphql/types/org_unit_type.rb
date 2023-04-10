# frozen_string_literal: true

module Types
  class OrgUnitType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :parent, Types::OrgUnitType, null: true
  end
end
