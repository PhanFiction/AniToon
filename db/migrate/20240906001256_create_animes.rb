class CreateAnimes < ActiveRecord::Migration[7.1]
  def change
    create_table :animes do |t|

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
