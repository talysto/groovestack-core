require 'jsonb_accessor'

class User < ActiveRecord::Base
  include Users::Roles
  # extend ::Devise::Models

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable

  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable

  has_many :identities, dependent: :destroy

  scope :fuzzysearch, ->(q) { where('name::text ilike ?', "%#{q}%".gsub(/\s/, '%').squeeze('%')) }
  scope :emailsearch, ->(qemail) { where('email::text ilike ?', "#{qemail}%") }

  # GraphqlDevise overrides (due to omniauthable relying on new Identity model)
  # NOTE: DeviseTokenAuth User.provider & User.uid columns are removed
  # TODO: can we remove this overrides?
  
  def provider 
    # will probably need to pick from identities eventually
    nil
  end

  def uid
    nil
  end

  def has_email_provider?
    encrypted_password.present?
  end
end
