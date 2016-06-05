class StoresController < ApplicationController

  def index
    @stores = []
    StoreUser.where(user_id: current_user.id).each do |store_user|
      @stores.push(Store.find_by(id: store_user.store_id))
    end
  end

  def show
    @store = Store.find_or_create_by(params[:display_address])
  end

  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)
    results.businesses.each do |business|
      store = Store.find_by(address: business.location.display_address)
      unless store
        Store.create(name: business.name, address: business.location.display_address[0])
      end
      if StoreUser.where(user_id: current_user.id, store_id: store.id).empty?
        StoreUser.create(user_id: current_user.id, store_id: store.id)
      end
    end
    render json: results
  end

end
