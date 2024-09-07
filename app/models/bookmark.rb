class Bookmark < ApplicationRecord
  belongs_to :user

  validates :anime_id, presence: true
  validates :name, presence: true

  def as_json(options = {})
    super({}.merge(options))
  end
end
