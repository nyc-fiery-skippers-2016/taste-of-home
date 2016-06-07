class StoresController < ApplicationController

  def show
    @comments = Comment.all

    @store = Store.find_by(set_store)
    @store_list = StoreList.all
    @store_tag = StoreTag.all
  end


  def search
    # using the search term to find the business from yelp
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)

    stores = results.businesses.map do |business|
      {name: business.name, address: business.location.display_address.push(business.location.country_code).join(", "), phone: business.display_phone, description: business.categories.flatten.join(", "), longitude: business.location.coordinate.longitude, latitude: business.location.coordinate.latitude, img_url: business.image_url, rating_url: business.rating_img_url, yelp_id: business.id, longitude_delta: results.region.span.longitude_delta, latitude_delta: results.region.span.latitude_delta, review_count: business.review_count}
    end
# creating or finding the store by results
    stores.each do |store|
      unless Store.exists?(yelp_id: store[:yelp_id])
        Store.create(store)
      end
    end
    render json: stores

    end


  private
    def set_store
      @store = Store.find_by(yelp_id: params[:yelp_id])
    end

    def store_params
      params.require(:store).permit(:name, :address, :description, :email, :phone, :longitude, :latitude, :image_url, :rating_url, :yelp_id, :favorite, :longitude_delta, :latitude_delta, :review_count)
    end

end
