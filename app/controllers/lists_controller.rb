class ListsController < ApplicationController

  def new
    @list = List.new
  end

  def create
    List.create(list_params)
    redirect_to "/users/#{current_user.id}"
  end

  def show
    @list = List.find_by(id: params[:id])
    @user = User.find_by(id: @list.user_id)
  end

  def destroy
    List.find_by(id: params[:id]).destroy
    redirect_to "/"
  end

  private
  def list_params
    params.require(:list).permit(:name, :description, :user_id)
  end
end
