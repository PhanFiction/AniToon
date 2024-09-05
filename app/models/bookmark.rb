class Bookmark < ApplicationRecord
  belongs_to :user

  validates :anime_id, presence: true
  validates :title, presence: true
end
