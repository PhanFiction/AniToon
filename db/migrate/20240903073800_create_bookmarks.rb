class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|

      t.references :user, foreign_key: true
      t.string :anime_id
      t.integer :mal_id
      t.string :name
      t.string :poster
      t.string :description
      t.string :rating
      t.string :duration
      t.timestamps
    end
  end
end
