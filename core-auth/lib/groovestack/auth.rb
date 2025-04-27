# frozen_string_literal: true

require 'groovestack/identities'
require 'groovestack/config'

require 'graphql_devise' if defined?(GraphqlDevise)
require 'omniauth-google-oauth2'
require 'omniauth-apple'

require 'groovestack/auth/version'
require 'groovestack/auth/railtie' if defined?(Rails::Railtie)

if defined?(GraphqlDevise)
  # add devise and devise_token_auth app/ dirs to load path
  Dir[File.join(Gem::Specification.find_by_name('devise').gem_dir, 'app', '*')].each do |sub_dir|
    $LOAD_PATH.push(sub_dir)
  end
  Dir[File.join(Gem::Specification.find_by_name('devise_token_auth').gem_dir, 'app', '*')].each do |sub_dir|
    $LOAD_PATH.push(sub_dir)
require 'auth/identity'
require 'auth/user'
# on app init, insert Auth concerns into User & Identity models
ActiveSupport.on_load(:active_record) do
  User.class_eval do
    include Auth::User
  end

  unless defined?(ApplicationController)
    class ApplicationController < ActionController::Base
    end
  
  Identity.class_eval do
    include Auth::Identity
  end

  unless defined?(DeviseTokenAuth::Concerns)
    module DeviseTokenAuth
      module Concerns
      end
    end
  GraphQL::User::Type.class_eval do
    include GraphQL::UserExtensions
  end
end

  GraphQL::Identity::Type.class_eval do
    include GraphQL::IdentityExtensions
  end
end

module Groovestack
  module Auth
    autoload :Provider, 'groovestack/auth/provider'

    if defined?(GraphqlDevise)
      autoload :AuthenticatedApiController, 'groovestack/auth/authenticated_api_controller'
      autoload :OmniauthCallbacksController, 'groovestack/auth/omniauth_callbacks_controller'
      autoload :ActionCable, 'groovestack/auth/action_cable'
      autoload :SchemaPlugin, 'groovestack/auth/schema_plugin'
    end

    module Providers
      extend ActiveSupport::Autoload

      eager_autoload do
        autoload :Email, 'groovestack/auth/providers/email'
        autoload :OmniAuth, 'groovestack/auth/providers/omni_auth'
        autoload :Apple, 'groovestack/auth/providers/apple'
        autoload :Google, 'groovestack/auth/providers/google'
      end
    end

    extend Dry::Configurable

    setting :disabled_providers, default: [], reader: true
  end
end

# TODO: remove aliases after all core modules have been updated
# to reference Groovestack::Auth
module Core
  module Auth
    Provider = ::Groovestack::Auth::Provider

    if defined?(GraphqlDevise)
      AuthenticatedApiController = ::Groovestack::Auth::AuthenticatedApiController
      OmniauthCallbacksController = ::Groovestack::Auth::OmniauthCallbacksController
      ActionCable = ::Groovestack::Auth::ActionCable
      SchemaPlugin = ::Groovestack::Auth::SchemaPlugin
    end

    module Providers
      Email = ::Groovestack::Auth::Providers::Email
      OmniAuth = ::Groovestack::Auth::Providers::OmniAuth
      Apple = ::Groovestack::Auth::Providers::Apple
      Google = ::Groovestack::Auth::Providers::Google
    end

    extend Dry::Configurable

    setting :disabled_providers, default: [], reader: true
  end
end
