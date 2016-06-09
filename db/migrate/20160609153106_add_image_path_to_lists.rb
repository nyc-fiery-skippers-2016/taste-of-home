class AddImagePathToLists < ActiveRecord::Migration
  def change
    add_column :lists, :image_filename, :string
  end
end
