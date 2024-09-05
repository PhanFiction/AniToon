class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|

      t.references :user, foreign_key: true
      t.string :anime_id
      t.string :title
      t.string :synopsis
      t.string :image
      t.string :rating
      t.string :anime_type
      t.string :duration
      t.timestamps
    end
  end
end
