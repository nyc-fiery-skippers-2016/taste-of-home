class StoresController < ApplicationController

  def index
    @search_term = params[:term]
    @search_location = params[:location]
  end

  def show
    @store = Store.find_by(yelp_id: params[:yelp_id])
    @store_list = StoreList.new
    @store_tag = StoreTag.new
    @comments = @store.comments
  end


  def search
    # using the search term to find the business from yelp
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }

    begin
      results = Yelp.client.search(params[:location], parameters)
    rescue
      return render json: []
    end

    stores = results.businesses.map do |business|
      {name: business.name, address: business.location.display_address.push(business.location.country_code).join(", "), neighborhoods: business.location.neighborhoods, phone: business.display_phone, description: business.categories.flatten.join(", "), longitude: business.location.coordinate.longitude, latitude: business.location.coordinate.latitude, img_url: business.image_url, rating_url: business.rating_img_url, yelp_id: business.id, longitude_delta: results.region.span.longitude_delta, latitude_delta: results.region.span.latitude_delta, review_count: business.review_count}
    end
    # creating or finding the store by results
    stores.each do |store|
      unless Store.exists?(yelp_id: store[:yelp_id])
        Store.create(store)
      end
    end

    #does not add to list if it is in favorites because it will be already shown
    if logged_in?
      StoreUser.where(user_id: current_user.id).each do |store_user|
        store = Store.find_by(id: store_user.store_id)
        store_in_list = stores.find do |store_in_list|
          store_in_list[:yelp_id] == store.yelp_id
        end
        stores.delete(store_in_list)
      end
    end

    render json: stores
  end

  def favorites
    stores = []
    current_user.stores.each do |favorite|
      stores << favorite
    end
    render json: stores
  end

  private
  def store_params
    params.require(:store).permit(:name, :address, :description, :email, :neighborhoods, :phone, :longitude, :latitude, :image_url, :rating_url, :yelp_id, :favorite, :longitude_delta, :latitude_delta, :review_count)
  end

end
