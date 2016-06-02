class StoresController < ApplicationController

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find_by(id: params[:id])
  end

end
