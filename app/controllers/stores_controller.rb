class StoresController < ApplicationController

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find(params[:id])
  end

  def search
    parameters = { term: params[:term], limit: 20, location: params[:location] }
    render json: Yelp.client.search(params[:location], parameters)
  end

  def results
    # @results =
  end
end
