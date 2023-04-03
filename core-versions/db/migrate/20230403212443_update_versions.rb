class UpdateVersions < ActiveRecord::Migration[7.0]
  def change
    add_column :versions, :object_changes, :jsonb, if_not_exists: true
  end
end
