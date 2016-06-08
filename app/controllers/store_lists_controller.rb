class StoreListsController < ApplicationController

  def create
    # params['store_list']['list_id'] = List.where(user_id: current_user.id).find_by(name: params['name']).id
    list = List.find_by(id: params['store_list']['list_id'])
    redirect_to root unless list.user == current_user
    StoreList.create(store_list_params)
    redirect_to "/lists/#{params['store_list']['list_id']}"
  end

  private
  def store_list_params
    params.require(:store_list).permit(:store_id, :list_id)
  end

end
