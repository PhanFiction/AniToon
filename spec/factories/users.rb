# comment out :confirmable in user model for testing. Otherwise it will lead to confirm error.
FactoryBot.define do
  factory :user do
    username { "JohnDoe" }
    full_name { "John Doe" }
    email { "johndoe@example.com" }
    password { "123456" }
  end
end