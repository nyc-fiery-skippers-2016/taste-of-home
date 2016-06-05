class ListsController < ApplicationController


  def create
    List.create(list_params)
    redirect_to "/"
  end

  def show
    @list = List.find_by(id: params[:id])
    @user = @list.user
  end

  private
  def list_params
    params.require(:list).permit(:name, :description, :user_id)
  end
end
