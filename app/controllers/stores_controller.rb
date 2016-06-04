class StoresController < ApplicationController

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find(params[:id])
  end

  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    render json: Yelp.client.search(params[:location], parameters)
  end

end
