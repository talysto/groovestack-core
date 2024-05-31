require 'fabrication'
require 'faker'

Fabricator(:user) do
  name { Faker::Name.name }
  password { Devise.friendly_token[0, 20] }
end

Fabricator(:user_with_email, from: :user) do
  email { Faker::Internet.email }
end

Fabricator(:admin_user, from: :user_with_email) do
  roles [User::Role::ADMIN]
end