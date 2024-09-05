require 'rails_helper'

RSpec.describe Bookmark, type: :model do
  subject { described_class.new }
  let(:user) { create(:user) }

  describe "Testing Bookmark controller." do
    context "User is able to make a bookmark with the anime." do
      it "User is able to save the anime to bookmark when all params are filled in" do
        subject.anime_id = '1e234'
        subject.title = 'Naruto'
        subject.synopsis = 'A boy saving the hidden leaf village'
        subject.image = 'some link'
        subject.rating = '18'
        subject.anime_type = 'fantasy'
        subject.duration = '24m'
        subject.user = user
        expect(subject).to be_valid
      end
    end

    context "User is not able to make a bookmark with the following missing params." do
      it "Missing params :anime_id." do
        subject.title = 'Naruto'
        subject.synopsis = 'A boy saving the hidden leaf village'
        subject.image = 'some link'
        subject.rating = '18'
        subject.anime_type = 'fantasy'
        subject.duration = '24m'
        subject.user = user
        expect(subject).not_to be_valid
      end

      it "Missing params :title." do
        subject.anime_id = '1e234'
        subject.synopsis = 'A boy saving the hidden leaf village'
        subject.image = 'some link'
        subject.rating = '18'
        subject.anime_type = 'fantasy'
        subject.duration = '24m'
        subject.user = user
        expect(subject).not_to be_valid
      end

      it "Missing params :title and :anime_id." do
        subject.synopsis = 'A boy saving the hidden leaf village'
        subject.image = 'some link'
        subject.rating = '18'
        subject.anime_type = 'fantasy'
        subject.duration = '24m'
        subject.user = user
        expect(subject).not_to be_valid
      end
    end
  end
end
