class StoreTag < ActiveRecord::Base
  belongs_to :store
  belongs_to :tag
end
