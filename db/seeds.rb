# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

u1 = User.create!(
  password: '123456',
  first_name: 'Zev',
  last_name: 'Bellringer',
  email: 'zev@bellringer'
)

u2 = User.create!(
  password: '123456',
  first_name: 'firstname2',
  last_name: 'lastname2',
  email: 'email@second'
)

demoUser = User.create!(
  password: "123456",
  first_name: "Rick",
  last_name: "Deckard",
  gender: "", 
  email: "rick@deckard" 
)

Route.delete_all

route1 = Route.create!(
  user_id: demoUser.id,
  route_name: 'firstroute',
  description: 'some',
  activity: 'biking',
  road_type: '',
  distance: '',
  estimated_duration: '',
  elevation: '',
  route_data: '{"lat":40.770040, "lng":-73.977047, "zoom":13}'
)

route2 = Route.create!(
  user_id: demoUser.id,
  route_name: 'secondroute',
  description: 'some other',
  activity: 'biking',
  road_type: '',
  distance: '',
  estimated_duration: '',
  elevation: '',
  route_data: '{"lat":40.661665, "lng":-73.972143, "zoom":13}'
)

            
