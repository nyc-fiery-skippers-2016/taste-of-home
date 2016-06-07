class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to "/users/#{@user.id}"
    else
      render "new"
    end
  end

  def show
    # if logged_in? && current_user == @user.id
      @user = User.find(params[:id])
 
    # @stores = []
    # if logged_in?
    #   StoreUser.where(user_id: current_user.id).each do |store_user|
    #     @stores.push(Store.find_by(id: store_user.store_id))
    #   end
      @list = List.new
      @lists = List.where(user_id: @user.id)
    # end
  end

  def destroy
    @user.destroy
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :password, :email)
    end


end
