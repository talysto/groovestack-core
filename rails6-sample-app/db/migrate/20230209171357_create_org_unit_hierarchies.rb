class CreateOrgUnitHierarchies < ActiveRecord::Migration[6.1]
  def change
    create_table :org_unit_hierarchies, id: false do |t|
      t.uuid :ancestor_id, null: false
      t.uuid :descendant_id, null: false
      t.integer :generations, null: false
    end

    add_index :org_unit_hierarchies, [:ancestor_id, :descendant_id, :generations],
      unique: true,
      name: "org_unit_anc_desc_idx"

    add_index :org_unit_hierarchies, [:descendant_id],
      name: "org_unit_desc_idx"
  end
end
