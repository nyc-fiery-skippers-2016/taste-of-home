class StoreUsersController < ApplicationController

  def create
    store = Store.find_by(address: params["address"])
    if logged_in? && StoreUser.where(user_id: current_user.id, store_id: store.id).empty?
      StoreUser.create(user_id: current_user.id, store_id: store.id)
    end
    redirect_to "/stores/#{store.id}"
  end

end
