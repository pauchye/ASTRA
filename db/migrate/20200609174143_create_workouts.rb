class CreateWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :workouts do |t|
      t.integer :user_id
      t.integer :route_id
      t.integer :distance
      t.integer :duration
      t.string :sport
      t.string :type
      t.string :date
      t.string :time
      t.string :title
      t.text :description

      t.timestamps
    end
    add_index :workouts, :user_id
    add_index :workouts, :route_id
  end
end
