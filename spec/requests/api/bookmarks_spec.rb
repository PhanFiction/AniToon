require 'rails_helper'

RSpec.describe "Api::Bookmarks", type: :request do
  let(:user) { create(:user) }
  let(:bookmark) { create(:bookmark, user: user) }
  
  before do 
    sign_in user 
    create(:bookmark, user: user)
  end
  
  describe "Testing bookmark controller " do
    context "Through GET /index " do
      it "will be able to receive a single saved bookmark" do
        get "http://localhost:3000/api/bookmarks"
        expect(response.status).to eq(200)
        expect(user.bookmarks.length).to eq(1)
      end
    end

    context "Able to create bookmark through /create" do
      it "When all params are filled" do
        post "http://localhost:3000/api/bookmarks", params: {bookmark: {anime_id: 2, name: "Attack on Titan season 2", mal_id: 925, description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans", rating: "R", duration: "24m", user_id: user.id } }
        body = JSON.parse(response.body)
        expect(response.status).to eq(200)
        expect(body['success']).to eq('Bookmark has been saved')

        get "http://localhost:3000/api/bookmarks"
        body = JSON.parse(response.body)
        expect(body.length).to eq(2)
      end
    end

    context "Fail to create bookmark" do
      it "when the title param is missing" do
        post "http://localhost:3000/api/bookmarks", params: {bookmark: {anime_id: 3, mal_id: 9225, description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans", rating: "R", duration: "24m", user_id: user.id } }

        body = JSON.parse(response.body)
        expect(response.status).to eq(500)
        expect(body['error']).to eq(["Name can't be blank"])
      end
    end

    context "Calling delete at /destroy" do
      it "will be able to delete the bookmark" do
        post "http://localhost:3000/api/bookmarks", params: {bookmark: {anime_id: 2, name: "Attack on Titan season 2", mal_id: 925, description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans", rating: "R", duration: "24m", user_id: user.id } }
        expect(response.status).to eq(200)

        newBookmark = JSON.parse(response.body)

        delete "http://localhost:3000/api/bookmarks/#{newBookmark["data"]["id"]}"
        expect(response.status).to eq(200)

        get "http://localhost:3000/api/bookmarks"
        body = JSON.parse(response.body)
        expect(body.length).to eq(1)
        expect(user.bookmarks.length).to eq(1)
      end
    end
  
  end
end
