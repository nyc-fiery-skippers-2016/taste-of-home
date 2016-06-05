class CreateStoreLists < ActiveRecord::Migration
  def change
    create_table :store_lists do |t|
      t.references :store, index: true, foreign_key: true
      t.references :list, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
