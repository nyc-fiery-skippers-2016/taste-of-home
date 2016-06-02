class CreateStoreTags < ActiveRecord::Migration
  def change
    create_table :store_tags do |t|
      t.references :store, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps null: false
    end
  end
end
