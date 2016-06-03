require 'yelp'

Yelp.client.configure do |config|
  config.consumer_key = ENV['MY_CONSUMER_KEY']
  config.consumer_secret = ENV['MY_CONSUMER_SECRET']
  config.token = ENV['MY_TOKEN']
  config.token_secret = ENV['MY_TOKEN_SECRET']
end
