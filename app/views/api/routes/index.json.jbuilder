@routes.each do |route|
    json.set! route.id do
        json.extract! route, :id, :user_id, :route_name, :description, :activity, :road_type, :distance, :estimated_duration, :elevation, :route_data, :created_at
    end
end