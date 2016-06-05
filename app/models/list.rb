class List < ActiveRecord::Base
  has_many :store_lists
  has_many :stores, through: :store_lists
  belongs_to :user
end
