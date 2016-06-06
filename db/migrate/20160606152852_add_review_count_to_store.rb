class AddReviewCountToStore < ActiveRecord::Migration
  def change
    add_column :stores, :review_count, :integer, default: 0
  end
end
