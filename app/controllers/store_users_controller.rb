class StoreUsersController < ApplicationController

  def create
    store = Store.find_by(yelp_id: params[:yelp_id])
    if logged_in? && StoreUser.where(user_id: current_user.id, store_id: store.id).empty?
      StoreUser.create(user_id: current_user.id, store_id: store.id)
    end
    if request.xhr?
      # byebug
      render json: ""
    else
      redirect_to "/stores/#{store.yelp_id}"
    end
  end

end
