class RenameColomnWorkouts < ActiveRecord::Migration[5.2]
  def change
    add_column :workouts, :workout_type, :string
  end
end
