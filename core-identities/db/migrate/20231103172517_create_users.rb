# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email
      t.jsonb  :roles, null: false, default: []
      t.string :language

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
