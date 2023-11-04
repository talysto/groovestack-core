module Core
  module Auth 
    class AuthenticatedApiController < ActionController::Base
      include GraphqlDevise::SetUserByToken
      include Devise::Controllers::Helpers
    end
  end
end