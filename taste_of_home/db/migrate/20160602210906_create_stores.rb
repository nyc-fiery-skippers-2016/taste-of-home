class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.string :description
      t.string :address, null: false
      t.string :phone
      t.string :email
      t.string :reviews
      t.timestamps null: false
    end
  end
end
