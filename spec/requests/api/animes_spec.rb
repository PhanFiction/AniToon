require 'rails_helper'

RSpec.describe "Api::Animes", type: :request do
  describe "Testing anime routes" do
    context "GET /index" do
      it "with success of returning data" do
        get "http://localhost:3000/api/anime"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/info/:id" do
      it "with success of returning anime info" do
        get "http://localhost:3000/api/anime/info?id=attack-on-titan-112"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/search" do
      it "with success of returning query data" do
        get "http://localhost:3000/api/anime/search?query=titan"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/genre" do
      it "with success of returning genre data" do
        get "http://localhost:3000/api/anime/genre?name=shounen&page=1"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/category/category?page=1" do
      it "with success of returning category data" do
        get "http://localhost:3000/api/anime/category?category=tv&page=1"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/episodes" do
      it "with success of returning episodes data" do
        get "http://localhost:3000/api/anime/episodes/epsiode=steinsgate-3"
        expect(response.status).to eq(200)
      end
    end

    context "GET /anime/episode" do
      it "with success of returning episode data" do
        get "http://localhost:3000/api/anime/episode?id=steinsgate-3?ep=230&server=hd-1&category=sub"
        expect(response.status).to eq(200)
      end
    end

  end
end
