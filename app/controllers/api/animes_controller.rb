require "rest-client"

class Api::AnimesController < ApplicationController
  # Default home page.
  def index
    data = RestClient.get "#{$anitoon_api}/anime/home"
    json_data = JSON.parse(data)
    
    if current_user
      user = User.find(current_user.id)
      bookmarks = user.bookmarks
      found_bookmark = Bookmark.find_bookmark(current_user.id)
      render json: { data: json_data, watch_list: found_bookmark }
    else
      render json: { data: json_data }
    end
  end

  # https://api-aniwatch.onrender.com/anime/info?id={anime-id}
  # Returns information about the anime.
  def info
    data = RestClient.get "#{$anitoon_api}/anime/info?id=#{params[:id]}"
    json_data = JSON.parse(data)

    if current_user
      user = User.find(current_user.id)
      bookmarks = user.bookmarks
      found_bookmark = Bookmark.find_bookmark(current_user.id, params[:id])
      render json: { data: json_data["anime"], watch_list: found_bookmark }
    else
      render json: { data: json_data["anime"] }
    end
  end

  # https://api-aniwatch.onrender.com/anime/search/suggest?q={query}
  # Query for anime.
  def search
    data = RestClient.get "#{$anitoon_api}/anime/search?q=#{params[:query]}"
    render json: data
  end

  def search_suggest
    data = RestClient.get "#{$anitoon_api}/anime/search/suggest?q=#{params[:query]}"
    render json: data
  end

  # https://api-aniwatch.onrender.com/anime/genre/{name}?page={page}
  # Returns anime based on genre.
  def genre
    # genre_types = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Josei", "Magic", "Mecha", "Isekai", "Kids", "Martial Arts", "Military", "Music", "Mystery", "Police", "Parody", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"]

    data = RestClient.get "#{$anitoon_api}/anime/genre/#{params[:id]}?page=#{params[:page]}"
    json_data = JSON.parse(data)
    
    if current_user
      user = User.find(current_user.id)
      bookmarks = user.bookmarks
      found_bookmark = Bookmark.find_bookmark(current_user.id)
      render json: { data: json_data, watch_list: found_bookmark }
    else
      render json: { data: json_data }
    end
  end

  # https://api-aniwatch.onrender.com/anime/{category}?page={page}
  # categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"
  def category
    data = RestClient.get "#{$anitoon_api}/anime/#{params[:id]}?page=#{params[:page]}"
    json_data = JSON.parse(data)
    
    if current_user
      user = User.find(current_user.id)
      bookmarks = user.bookmarks
      found_bookmark = Bookmark.find_bookmark(current_user.id)
      render json: { data: json_data, watch_list: found_bookmark }
    else
      render json: { data: json_data }
    end
  end

  # https://api-aniwatch.onrender.com/anime/episodes/{animeId}
  # Displays a list of episodes that the anime have
  def episodes
    data = RestClient.get "#{$anitoon_api}/anime/episodes/#{params[:id]}"
    render json: data
  end

  # https://api-aniwatch.onrender.com/anime/servers?episodeId={id}
  # Returns a list of servers for watching Anime episode.
  def episode_server
    data = RestClient.get "#{$anitoon_api}/anime/servers?episodeId=#{params[:id]}"
    render json: data
  end

  # https://api-aniwatch.onrender.com/anime/episode-srcs?id={episodeId}&server={server}&category={category}
  # category -> ('sub', 'dub' or 'raw')
  # Returns anime episode.
  def episode
    data = RestClient.get "#{$anitoon_api}/anime/episode-srcs?id=#{params[:id]}&#{params[:server]}&category=#{params[:category]}"
    render json: data
  end
end
