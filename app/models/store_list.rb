class StoreList < ActiveRecord::Base
  belongs_to :store
  belongs_to :list
end
