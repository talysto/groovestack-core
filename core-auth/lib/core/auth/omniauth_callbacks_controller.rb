require 'devise_helper'
require 'devise_controller'
require 'devise_token_auth/concerns/resource_finder'
require 'devise_token_auth/concerns/set_user_by_token'
require 'devise_token_auth/application_controller'
require 'devise_token_auth/omniauth_callbacks_controller'

class Core::Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController # Devise::OmniauthCallbacksController
  def auth_hash
    @auth_hash ||= request.env['omniauth.auth'] # goes through plain old omniauth so need to override
  end

  def resource_class(mapping = nil)
    # TODO: this is required b/c their code relies on the resource_class
    # method which expects access to the 'dta.omniauth.params' which we
    # don't currently have access through b/c we are going directly
    # through omniauth


    return @resource_class if defined?(@resource_class)

    @resource_class = @resource.class
    raise 'No resource_class found' if @resource_class.nil?

    @resource_class
  end

  def create_auth_params
    @auth_params = {
      auth_token: @token.token,
      client_id:  @token.client,
      # uid:        @resource.uid,
      expiry:     @token.expiry,
      config:     @config,
      id:         @resource.id
    }
    @auth_params.merge!(oauth_registration: true) if @oauth_registration
    @auth_params
  end

  def get_resource_from_auth_hash
    # find or create user by provider and provider uid
    # @resource = resource_class.where(
    #   uid: auth_hash['uid'],
    #   provider: auth_hash['provider']
    # ).first_or_initialize

    invitation_token = request.env.dig('omniauth.params', 'invitation_token')
    language = request.env.dig('omniauth.params', 'language')
    # auth = request.env['omniauth.auth']

    identity_params = { auth: auth_hash, language: language }

    @resource = Identity.find_or_create_from_omniauth!(**identity_params).user

    # if @resource.new_record?
    #   handle_new_resource
    # end

    # sync user info with provider, update/generate auth token
    assign_provider_attrs(@resource, auth_hash)

    # assign any additional (whitelisted) attributes
    # if assign_whitelisted_params?
    #   extra_params = whitelisted_params
    #   @resource.assign_attributes(extra_params) if extra_params
    # end

    @resource
  end

  def google
    omniauth_success do 
      set_token_in_cookie(@resource, @token)
      redirect_to DeviseTokenAuth::Url.generate(request.env["omniauth.origin"], redirect_options)

      return
    end
  end
end