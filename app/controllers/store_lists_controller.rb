class StoreListsController < ApplicationController

  def create
    params['store_list']['list_id'] = List.find_by(name: params['name']).id
    StoreList.create(store_list_params)
    redirect_to "/"
  end

  private
  def store_list_params
    params.require(:store_list).permit(:store_id, :list_id)
  end

end
