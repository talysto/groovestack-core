# frozen_string_literal: true

class CreateCoreComments < ActiveRecord::Migration[6.0]
  def change
    create_table :core_comments, if_not_exists: true, id: :uuid do |t|
      t.string     :namespace
      t.references :resource, polymorphic: true, type: :uuid, null: false
      t.references :author, polymorphic: true, type: :uuid, null: false
      t.text       :body, null: false
      t.timestamps
    end

    add_index :core_comments, [:namespace], if_not_exists: true
  end
end
