class CreateStoreTags < ActiveRecord::Migration
  def change
    create_table :store_tags do |t|

      t.timestamps null: false
    end
  end
end
