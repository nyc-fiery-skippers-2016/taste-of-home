
require 'faker'

User.delete_all
Tag.delete_all



users = 20.times.map do
  User.create!( :username => Faker::Internet.user_name,
                :email => Faker::Internet.email,
                :password => "password",
    )
end

Tag.create!(description: 'British')
Tag.create!(description: 'Senegal')
Tag.create!(description: 'candy')
Tag.create!(description: 'spices')
Tag.create!(description: 'Vietnam')
Tag.create!(description: 'French')
Tag.create!(description: 'bread')
Tag.create!(description: 'Brazil')
Tag.create!(description: 'New Zealand')
