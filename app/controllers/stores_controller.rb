class StoresController < ApplicationController

  def show
    @store = Store.find_by(id: params[:id])
    @store_list = StoreList.new
  end

  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)
    new_results = {}

    new_results[:businesses] = []
    new_results[:latitude] = results.region.center.latitude
    new_results[:longitude] = results.region.center.longitude
    new_results[:latitude_delta] = results.region.span.latitude_delta
    new_results[:longitude_delta] = results.region.span.longitude_delta
    results.businesses.each do |business|
      new_results[:businesses] << {address: business.location.address[0], city: business.location.city, country_code: business.location.country_code, name: business.name, id: business.id, image_url: business.image_url, rating_img_url: business.rating_img_url, review_count: business.review_count}
    end

    @stores = []
    new_results[:businesses].each do |business|
      store = Store.find_by(address: business[:id])
        unless store
          store = Store.new(name: business[:name], address: business[:id])
          store.save
        end
      @stores << store
      end
    render json: new_results
  end

end
