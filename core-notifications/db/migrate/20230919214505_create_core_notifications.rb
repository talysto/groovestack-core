# frozen_string_literal: true

class CreateCoreNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :core_notifications, id: :uuid do |t|
      t.timestamps
    end
  end
end
