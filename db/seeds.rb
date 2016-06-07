
require 'faker'

User.delete_all
Tag.delete_all



users = 20.times.map do
  User.create!( :username => Faker::Internet.user_name,
                :email => Faker::Internet.email,
                :password => "password",
                :owner => false
    )
end

Tag.create!(name: 'British')
Tag.create!(name: 'Senegal')
Tag.create!(name: 'candy')
Tag.create!(name: 'spices')
Tag.create!(name: 'Vietnam')
Tag.create!(name: 'French')
Tag.create!(name: 'bread')
Tag.create!(name: 'Brazil')
Tag.create!(name: 'New Zealand')
