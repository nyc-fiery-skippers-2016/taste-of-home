class StoresController < ApplicationController

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find_or_create_by(params[:display_address])
  end

  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)
    render json: results
  end

end
