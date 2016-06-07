class TagsController < ApplicationController

  def index
    if params[:tag]
      tag = Tag.find_by(name: params[:tag])
      @stores = tag.stores if tag
    end
  end

  def show
    @tag = Tag.find_by(id: params[:id])
  end

end
