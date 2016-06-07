class StoreTagsController < ApplicationController

  def create
    tag = Tag.find_by(name: params[:name])
    tag = Tag.create(name: params[:name]) unless tag
    StoreTag.create(store_id: params[:store_id], tag_id: tag.id)
    redirect_to "/stores/#{Store.find_by(id: params[:store_id]).yelp_id}"
  end

end
