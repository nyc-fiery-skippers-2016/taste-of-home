class Store < ActiveRecord::Base
  has_many :store_tags
  has_many :tags, through: :store_tags
  has_many :store_users
  has_many :users, through: :store_users
end
