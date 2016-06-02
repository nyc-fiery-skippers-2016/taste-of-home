class CreateStoreUsers < ActiveRecord::Migration
  def change
    create_table :store_users do |t|
      t.references :user, foreign_key: true
      t.references :store, foreign_key: true

      t.timestamps null: false
    end
  end
end
