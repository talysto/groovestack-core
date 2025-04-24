# frozen_string_literal: true

class User < ActiveRecord::Base
  include Users::Roles

  has_many :identities, dependent: :destroy

  scope :fuzzysearch, ->(q) { where('name::text ilike ?', "%#{q}%".gsub(/\s/, '%').squeeze('%')) }
  scope :emailsearch, ->(qemail) { where('email::text ilike ?', "#{qemail}%") }
end
