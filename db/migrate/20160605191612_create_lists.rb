class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false, unique: true
      t.text :description, null: false

      t.references :user, null: false
      t.timestamps null: false
    end
  end
end
