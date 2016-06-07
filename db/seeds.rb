
# PanSamPanSam
# Should not need to require Faker
require 'faker'

User.create!( :username => "tasteofhome",
              :email => "admin@tasteofhome.com",
              :password => "password",
              :owner => false
)

def associate_stores_and_foods_to_list(list, food, location)
  parameters = { term: food, category_filter: "food", limit: 5}
  results = Yelp.client.search(location, parameters)

  stores = results.businesses.map do |business|
    {name: business.name, address: business.location.display_address.push(business.location.country_code).join(", "), phone: business.display_phone, description: business.categories.flatten.join(", "), longitude: business.location.coordinate.longitude, latitude: business.location.coordinate.latitude, img_url: business.image_url, rating_url: business.rating_img_url, yelp_id: business.id, longitude_delta: results.region.span.longitude_delta, latitude_delta: results.region.span.latitude_delta, review_count: business.review_count}
  end
  stores.each do |store|
    list.stores << Store.where(yelp_id: store[:yelp_id]).first_or_create(store)
  end
end

# User.delete_all
# Tag.delete_all

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

minnesota = List.create!(user_id: "tasteofhome", name: 'Taste of Minnesota', description: "It's the home of warm welcomes and cold winters, of lutefisk and Lizzo, of 10,000 lakes and the late, great Prince. Here's a selection of places where you can find a bit of the North Star State in NYC.")

associate_stores_and_foods_to_list(minnesota, "cheese curds", 11211)
associate_stores_and_foods_to_list(minnesota, "swedish meatballs", 10005)
associate_stores_and_foods_to_list(minnesota, "juicy lucy burger", 11211)
associate_stores_and_foods_to_list(minnesota, "wild rice soup", 11211)
associate_stores_and_foods_to_list(minnesota, "fudge bars", 10001)

london = List.create!(user_id: "tasteofhome", name: 'Taste of London', description: "It's no surprise that residents of the British capital feel at home in New York. The two cities have much in common, including top-tier theater, vast subway systems, and, of course, astronomical housing costs. Like New York, London is also a city of rich food traditions, many of which have made their way across the pond. Here's where you can experience the Big Smoke in the Big Apple.")

associate_stores_and_foods_to_list(london, "walkers crisps", 10001)
associate_stores_and_foods_to_list(london, "fish and chips", 11211)
associate_stores_and_foods_to_list(london, "british curry", 10002)
associate_stores_and_foods_to_list(london, "full english breakfast", 10017)
associate_stores_and_foods_to_list(london, "ribena", 11104)

upstate = List.create!(user_id: "tasteofhome", name: 'Taste of Upstate New York', description: "As residents of America's largest and most crowded city, we sometimes forget that there's quite a lot of New York that exists beyond the reaches of our subways and commuter trains. Upstate New York is home to approximately six million people with traditions distinctly different from those found downstate. They drink Labatt Blue instead of Bud Light. They cheer for the Bills instead of the Giants. And when they leave the region, they miss these unique foods most of all.")

associate_stores_and_foods_to_list(upstate, "loganberry", 11216)
associate_stores_and_foods_to_list(upstate, "beef on weck", 11211)
associate_stores_and_foods_to_list(upstate, "utica greens", 11205)
associate_stores_and_foods_to_list(upstate, "garbage plate", 10014)
associate_stores_and_foods_to_list(upstate, "wegmans", 11105)
