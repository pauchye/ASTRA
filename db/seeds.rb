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
  route_name: 'central park run',
  description: 'after aA',
  activity: 'running',
  road_type: '',
  distance: '7.11 mi',
  estimated_duration: 8544,
  elevation: '',
  route_data: '{"lat":40.7678805,"lng":-73.97103059999999,"zoom":"13","route_coord":"","path":[{"lat":40.7678805,"lng":-73.97103059999999},{"lat":40.7853349,"lng":-73.9676296},{"lat":40.7926518,"lng":-73.9522575},{"lat":40.7940953,"lng":-73.9588997}]}'
)

route2 = Route.create!(
  user_id: demoUser.id,
  route_name: 'Bike to work',
  description: 'Via the Brooklyn Bridge',
  activity: 'biking',
  road_type: '',
  distance: '4.83 mi',
  estimated_duration: 6303,
  elevation: '',
  route_data: '{"lat":40.659217,"lng":-73.9605184,"zoom":"13","route_coord":"","path":[{"lat":40.659217,"lng":-73.9605184},{"lat":40.7147058,"lng":-74.0073634}]}'
)

Workout.delete_all

workout1 = Workout.create!(
  user_id: demoUser.id,
  route_id: route2.id,
  title: 'Biking to work',
  description: 'Morning workout on my way to work',
  sport: 'biking',
  date: '6/9/2020',
  time: '8:30 am',
  distance: 483,
  duration: 3605
)

workout2 = Workout.create!(
  user_id: demoUser.id,
  route_id: route1.id,
  title: 'Running in the park',
  description: 'Sunny day. Good to run!',
  sport: 'running',
  date: '6/10/2020',
  time: '11:30 am',
  distance: 711,
  duration: 8544
)

workout3 = Workout.create!(
  user_id: demoUser.id,
  route_id: route1.id,
  title: 'Running late',
  description: 'Lazy day',
  sport: 'running',
  date: '6/8/2020',
  time: '10:30 am',
  distance: 711,
  duration: 8544
)

workout4 = Workout.create!(
  user_id: demoUser.id,
  route_id: route2.id,
  title: 'Biking to work again',
  description: 'Morning workout on my way to work',
  sport: 'biking',
  date: '6/11/2020',
  time: '8:30 am',
  distance: 546,
  duration: 4531
)

workout5 = Workout.create!(
  user_id: demoUser.id,
  route_id: route1.id,
  title: 'Running in the park again',
  description: 'Sunny day. Good to run!',
  sport: 'running',
  date: '6/11/2020',
  time: '11:30 am',
  distance: 659,
  duration: 7890
)


            
