# frozen_string_literal: true

require 'devise_token_auth/concerns/resource_finder'
require 'devise_token_auth/concerns/set_user_by_token'

module Groovestack
  module Auth
    class AuthenticatedApiController < ApplicationController
      include GraphqlDevise::SetUserByToken
      include Devise::Controllers::Helpers
    end
  end
end
