class StoresController < ApplicationController

  def show
    @store = Store.find_or_create_by(params[:display_address])
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
      # if StoreUser.where(user_id: current_user.id, store_id: store.id).empty?
      #   StoreUser.create(user_id: current_user.id, store_id: store.id)
      # end
      end
    render json: results
  end

end
