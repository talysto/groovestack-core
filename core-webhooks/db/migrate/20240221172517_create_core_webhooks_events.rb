class CreateCoreWebhooksEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :core_webhooks_events, id: :uuid do |t|
      t.string :source, null: false
      t.string :status, null: false
      t.string :event
      t.jsonb :headers
      t.jsonb :data

      t.timestamps
    end
  end
end
