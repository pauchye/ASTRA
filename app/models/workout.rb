class Workout < ApplicationRecord
    validates :title, :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

    belongs_to :route,
    foreign_key: :route_id,
    class_name: 'Route'

end
