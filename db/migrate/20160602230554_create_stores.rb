class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.text :description
      t.string :address, null: false
      t.integer :phone
      t.string :email
      t.boolean :favorite, default: false

      t.timestamps null: false
    end
  end
end
