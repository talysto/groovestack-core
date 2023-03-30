class CreateVersions < ActiveRecord::Migration[6.0]
  TEXT_BYTES = 1_073_741_823

  def change
    create_table :versions, if_not_exists: true, id: :uuid do |t|
      t.string    :item_type,   null: false
      t.uuid      :item_id,     null: false
      t.string    :event,       null: false
      t.string    :whodunnit
      t.text      :object, limit: TEXT_BYTES
      t.json      :object_changes

      t.datetime :created_at
    end

    add_index :versions, %i[item_type item_id]
  end
end
