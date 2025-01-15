# require 'devise_token_auth/concerns/resource_finder'
# require 'devise_token_auth/concerns/set_user_by_token'

module Core
  module Auth 
    class AuthenticatedApiController < ActionController::Base
      # include GraphqlDevise::SetUserByToken
      # include Devise::Controllers::Helpers
    end
  end
end