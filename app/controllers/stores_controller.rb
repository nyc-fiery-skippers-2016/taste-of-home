class StoresController < ApplicationController

  def index
    @stores = Store.all
    @user = current_user
  end

  def show
    @store = Store.find_by(id: params[:id])
    @store_list = StoreList.new
  end

  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)
    @stores = []
    results.businesses.each do |business|
      store = Store.find_by(address: business.id)
        unless store
          store = Store.new(name: business.name, address: business.id)
          store.save
        end
      @stores << store

      end
    render json: results
  end

end
