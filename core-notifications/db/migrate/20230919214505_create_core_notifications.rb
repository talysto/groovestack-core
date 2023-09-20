# frozen_string_literal: true

class CreateCoreNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :core_notifications, id: :uuid do |t|

      # required
      t.string      :type, null: false
      t.string      :title, null: false
      t.string      :description, null: false
      t.string      :to_type, null: false

      # optional
      t.uuid        :to_id, null: true
      t.string      :to_scope, null: true
      t.jsonb       :link, null: true
      t.jsonb       :actions, null: true
      t.string      :action_response, null: true
      t.uuid        :read_bloom, array: true, default: []
      
      t.references  :from, index: false, polymorphic: true, type: :uuid, null: true
      t.references  :object, index: false, polymorphic: true, type: :uuid, null: true
      
      t.datetime    :expire_at, null: true 
      t.datetime    :publish_at, null: true
      t.datetime    :read_at, null: true 

      t.timestamps
    end
  end
end
