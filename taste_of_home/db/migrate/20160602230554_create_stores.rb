class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.text :description
      t.string :address, null: false
      t.integer :phone
      t.string :email
      t.text :reviews

      t.timestamps null: false
    end
  end
end
