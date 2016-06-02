class CreateStoreUsers < ActiveRecord::Migration
  def change
    create_table :store_users do |t|

      t.timestamps null: false
    end
  end
end
