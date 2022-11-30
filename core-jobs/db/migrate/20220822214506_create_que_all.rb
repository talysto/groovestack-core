class CreateQueAll < ActiveRecord::Migration[6.0]
  def change
    create_view :que_all
  end
end
