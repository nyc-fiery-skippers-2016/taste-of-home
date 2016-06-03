class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:session][:username])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to :root
    else
      @errors = ["Bad username or password, please reenter"]
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to :root
  end
end
