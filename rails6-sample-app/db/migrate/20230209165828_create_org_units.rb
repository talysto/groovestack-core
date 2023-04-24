# frozen_string_literal: true

class CreateOrgUnits < ActiveRecord::Migration[6.1]
  def change
    create_table :org_units, id: :uuid do |t|
      t.string :name, null: false

      t.references :parent, index: false, type: :uuid

      t.timestamps
    end

    add_foreign_key :org_units, :org_units, column: :parent_id
  end
end
