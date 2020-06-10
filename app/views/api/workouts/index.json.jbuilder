@workouts.each do |workout|
    json.set! workout.id do
        json.extract! workout, :id, :user_id, :route_id, :distance, :duration, :sport, :type, :date, :time, :title, :description, :created_at
    end
end