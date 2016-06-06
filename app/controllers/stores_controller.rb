class StoresController < ApplicationController

  def index
    @stores = Store.all
    @user = current_user
  end

  def show
    @store = Store.find_or_create_by(params[:display_address])
    @comments = Comment.all

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

      # store = Store.find_by(address: business.id)
      #   unless store
      #     store = Store.new(name: business.name, address: business.id)
      #     store.save
      #   end

      # @stores << store
      # if StoreUser.where(user_id: current_user.id, store_id: store.id).empty?
      #   StoreUser.create(user_id: current_user.id, store_id: store.id)
      # end

      # end
    # hybrid_results = results.businesses.map do |business|

    # render json: results
# =======
#     parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
#     results = Yelp.client.search(params[:location], parameters)
#     new_results = {}

#     new_results[:businesses] = []
#     new_results[:latitude] = results.region.center.latitude
#     new_results[:longitude] = results.region.center.longitude
#     new_results[:latitude_delta] = results.region.span.latitude_delta
#     new_results[:longitude_delta] = results.region.span.longitude_delta
#     results.businesses.each do |business|
#       new_results[:businesses] << {address: business.location.address[0], city: business.location.city, country_code: business.location.country_code, name: business.name, id: business.id, image_url: business.image_url, rating_img_url: business.rating_img_url, review_count: business.review_count}
#     end

#     @stores = []
#     new_results[:businesses].each do |business|
#       store = Store.find_by(address: business[:id])
#         unless store
#           store = Store.new(name: business[:name], address: business[:id])
#           store.save
#         end

#       @stores << store
#       end
#     render json: new_results
# >>>>>>> master
  end


private 
    def set_store
      @store = Store.find(params[:id])
    end
    def store_params
      params.require(:store).permit(:name, :description, :address, :email, :phone)
    end
end
