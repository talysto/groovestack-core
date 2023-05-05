class EnableCitextPgExtension < ActiveRecord::Migration[6.1]
  def change
    enable_extension :citext unless extension_enabled?(:citext)
  end
end
