class Tag < ActiveRecord::Base
  has_many :store_tags
  has_many :stores, through: :store_tags
end
