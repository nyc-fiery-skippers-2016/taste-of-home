class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string  :name, null: false
      t.text    :description
      t.string  :address, null: false
      t.string  :phone
      t.string  :email
      t.float   :longitude, null: false
      t.float   :latitude, null: false
      t.float   :longitude_delta, null: false
      t.float   :latitude_delta, null: false
      t.text  :img_url
      t.text  :rating_url
      t.string  :yelp_id, null: false
      t.boolean :favorite, default: false

      t.timestamps null: false
    end
  end
end
