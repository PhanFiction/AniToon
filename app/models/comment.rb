class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :anime

  scope :find_comments, ->(anime_id = nil) {
    comments = Comment.where(anime_id: anime_id) if anime_id.present?
    comments
  }
end