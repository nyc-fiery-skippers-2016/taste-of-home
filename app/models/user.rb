class User < ActiveRecord::Base
  has_many :store_users
  has_many :stores, through: :store_users
<<<<<<< HEAD
  has_many :comments
=======
  has_many :lists
>>>>>>> master

  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password
end
