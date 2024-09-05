class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, # :confirmable, # comment out :confirmable for testing
         :recoverable, :rememberable, :validatable, 
         :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :bookmarks
  validates :full_name, presence: true
  validates :email, presence: true
  validates :username, presence: true, length: { minimum: 5 }


  def self.from_omniauth(auth)
    data = auth.info
    find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
      user.email = data.email
      user.password = Devise.friendly_token[0, 20]
      user.username = data.username ? data.username : data.first_name + data.last_name # if no username, make username with first and last name
      user.full_name = data.name
      user.avatar_url = data.image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      user.skip_confirmation!
    end
  end
end
