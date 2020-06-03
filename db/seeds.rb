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
  first_name: 'firstname1',
  last_name: 'lastname1',
  email: 'email@first'
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
            
