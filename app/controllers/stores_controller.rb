class StoresController < ApplicationController

  def index


  end

  def show
    @store = Store.find_or_create_by(params[:display_address])
    @comments = Comment.all
  end


  def search
    parameters = { term: params[:term], category_filter: params[:category_filter], limit: 5, location: params[:location] }
    results = Yelp.client.search(params[:location], parameters)
    results.businesses.each do |business|
      store = Store.find_by(address: business.location.display_address)
        unless store
          Store.create(name: business.name, address: business.location.display_address[0])
        end
      end
    byebug
    # hybrid_results = results.businesses.map do |business|
    render json: results
  end

end
