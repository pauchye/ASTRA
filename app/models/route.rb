class Route < ApplicationRecord
    validates :route_name, :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

end
