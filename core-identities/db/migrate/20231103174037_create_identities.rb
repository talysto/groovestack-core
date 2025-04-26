# frozen_string_literal: true

class CreateIdentities < ActiveRecord::Migration[7.0]
  def change
    create_table :identities, id: :uuid do |t|
      t.string :provider
      t.string :uid

      t.references :user, foreign_key: true, index: false, null: false, type: :uuid

      t.timestamps
    end

    add_index :identities, %i[provider uid], unique: true
  end
end
