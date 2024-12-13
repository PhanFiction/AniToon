class Api::BookmarksController < ApplicationController
  before_action :authenticate_user!

  def index
    bookmarks = Bookmark.find_bookmark(current_user.id)
    render json: bookmarks
  end

  def create 
    user = User.find(current_user.id)
    bookmark = user.bookmarks.build(bookmark_params)
    if bookmark.save
      render json: { success: "Bookmark has been saved", data: bookmark }
    else
      render json: { error: bookmark.errors.full_messages }, status: 500
    end
  end

  def destroy
    bookmark = Bookmark.find(params[:id]) # search bookmark by id
    
    if bookmark.destroy # delete bookmark
      render json: { success: "Bookmark has been deleted", redirect: root_url }
    else
      render json: { error: bookmark.errors.full_messages }, status: 500
    end
  end

  def bookmark_params
    params.require(:bookmark).permit(:name, :description, :anime_id, :poster, :mal_id, :rating)
  end
end