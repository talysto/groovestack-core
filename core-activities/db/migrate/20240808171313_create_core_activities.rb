class CreateCoreActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :core_activities, id: :uuid do |t|
      t.string :type, null: false
      t.text  :summary
      t.text  :note
      t.jsonb :meta
  
      t.references :actor, index: false, polymorphic: true, type: :uuid
      t.references :object, index: false, polymorphic: true, type: :uuid
      t.references :target, index: false, polymorphic: true, type: :uuid

      t.timestamps
    end

    add_index :core_activities, %i[actor_id type]
    add_index :core_activities, %i[object_id type]
    add_index :core_activities, %i[target_id type]
  end
end
