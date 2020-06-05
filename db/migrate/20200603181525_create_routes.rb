class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.integer :user_id
      t.string :route_name
      t.text :description
      t.string :activity
      t.string :road_type
      t.string :distance
      t.integer :estimated_duration
      t.integer :elevation
      t.string :route_data

      t.timestamps
    end
    add_index :routes, :user_id
  end
end
