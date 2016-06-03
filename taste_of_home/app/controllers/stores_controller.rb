class StoresController < ApplicationController

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find(params[:id])
  end

  def search
    parameters = { term: params[:term], limit: 20 }
    render json: Yelp.client.search('New York', parameters)
  end
end
