class CommentsController < ApplicationController

  def new
    @store = Store.find_by(yelp_id: params[:yelp_id])
    @comment = Comment.new(params[:comment])

    if request.xhr?
      render partial: '/comments/new_comment', layout: false, locals: { comment: @comment, store: @store}
    end
  end

  def create
    @comment = Comment.create(comment_params)

    if request.xhr?
      render partial: '/comments/comments_display', layout: false, locals: { comment: @comment }
    else
      redirect_to "/stores/#{@comment.store.yelp_id}"
    end

  end

  private
  def comment_params
    params.require(:comment).permit(:title, :body, :user_id, :store_id)
  end
end
