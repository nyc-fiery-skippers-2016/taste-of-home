class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.create(comment_params)
  end

  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end
