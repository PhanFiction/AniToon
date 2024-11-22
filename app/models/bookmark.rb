class Bookmark < ApplicationRecord
  belongs_to :user

  validates :anime_id, presence: true
  validates :name, presence: true

  scope :find_bookmark, ->(user_id, anime_id = nil) {
    bookmarks = Bookmark.where(user_id: user_id)
    bookmarks = bookmarks.where(anime_id: anime_id) if anime_id.present?
    bookmarks
  }

  def as_json(options = {})
    super({}.merge(options))
  end
end
