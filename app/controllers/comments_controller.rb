class CommentsController < ApplicationController

  def new
    @store = Store.find_by(yelp_id: params[:yelp_id])
    @comment = Comment.new(params[:comment])
  end

  def create
    @comment = Comment.new(comment_params)


    if @comment.save
      redirect_to "/stores/#{@comment.store.yelp_id}"
    else
      redirect_to "/stores/#{@comment.store.yelp_id}/comments/new"
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:title, :body, :user_id, :store_id)
  end
end
