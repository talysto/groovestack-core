# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


20.times { User.create!(name: Faker::Name.name, email: Faker::Internet.email) } unless User.count.positive?
100.times { Thing.create!(name: Faker::FunnyName.two_word_name) } unless Thing.count.positive?

OrgUnit.where(name: 'ATMOS').first_or_create!
OrgUnit.where(name: 'Emergent Intergalactic').first_or_create!