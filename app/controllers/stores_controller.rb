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
    # parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], store_parameters)
    byebug
    results.businesses.each do |business|
      Store.create_or_find_by(store_params)
    end
   
    render json: results
  end


private 
    def set_store
      @store = Store.find(params[:id])
    end
    def store_params
      params.require(:store).permit(:name, :description, :address, :email, :phone)
    end
end
