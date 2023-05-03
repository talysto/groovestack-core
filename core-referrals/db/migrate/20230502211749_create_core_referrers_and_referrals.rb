# frozen_string_literal: true

class CreateCoreReferrersAndReferrals < ActiveRecord::Migration[6.0]
  def change
    create_table :core_referrers, if_not_exists: true, id: :uuid do |t|
      t.citext :code, null: false, index: { unique: true }
      t.integer :referrals_count, default: 0
      t.references :referrer, polymorphic: true, type: :uuid, null: false

      t.timestamps
    end

    create_table :core_referrals, if_not_exists: true, id: :uuid do |t|
      t.references :core_referrer, foreign_key: true, type: :uuid, null: false
      t.references :referred, polymorphic: true, type: :uuid, null: false

      t.timestamps
    end
  end
end
