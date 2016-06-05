class User < ActiveRecord::Base
  has_many :store_users
  has_many :stores, through: :store_users
  has_many :lists

  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password
end
