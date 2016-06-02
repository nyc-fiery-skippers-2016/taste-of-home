class StoresController < ApplicationController

  def show
    @store = Store.find_by(id: params[:id])
  end

end
