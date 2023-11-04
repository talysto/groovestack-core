require 'graphql_devise'

class User < ActiveRecord::Base
  include Users::Roles
  extend ::Devise::Models

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include ::GraphqlDevise::Authenticatable

  # NOTE: this must be after the include DeviseTokenAuth::Concerns::User
  # b/c Devise Token Auth apparently removes the omniauthable module
  # https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/models/devise_token_auth/concerns/user.rb#L18
  
  devise :omniauthable, omniauth_providers: [:google]

  has_many :identities, dependent: :destroy

  scope :fuzzysearch, ->(q) { where('name::text ilike ?', "%#{q}%".gsub(/\s/, '%').squeeze('%')) }
  scope :emailsearch, ->(qemail) { where('email::text ilike ?', "#{qemail}%") }

  # GraphqlDevise overrides (due to omniauthable relying on new Identity model)
  # NOTE: DeviseTokenAuth User.provider & User.uid columns are removed

  def provider 
    # will probably need to pick from identities eventually
    nil
  end

  def uid
    nil
  end

  def build_auth_headers(token, client = 'default')
    # client may use expiry to prevent validation request if expired
    # must be cast as string or headers will break
    expiry = tokens[client]['expiry'] || tokens[client][:expiry]
    headers = {
      DeviseTokenAuth.headers_names[:"access-token"] => token,
      DeviseTokenAuth.headers_names[:"token-type"]   => 'Bearer',
      DeviseTokenAuth.headers_names[:"client"]       => client,
      DeviseTokenAuth.headers_names[:"expiry"]       => expiry.to_s,
      DeviseTokenAuth.headers_names[:"id"]           => id
    }
    headers.merge(build_bearer_token(headers))
  end
end
