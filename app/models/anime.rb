class Anime < ApplicationRecord
  validates :anime_id, presence: true
  validates :name, presence: true
  validates :mal_id, presence: true
end
