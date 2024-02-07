# frozen_string_literal: true

require 'graphql_devise'
require 'omniauth-google-oauth2'
require 'omniauth-apple'

require 'core/auth/version'
require 'active_record'

require 'core/auth/railtie' if defined?(Rails::Railtie)
require 'core/auth/provider'

# add devise and devise_token_auth app/ dirs to load path
Dir[File.join(Gem::Specification.find_by_name("devise").gem_dir, "app", '*')].each { |sub_dir| $LOAD_PATH.push(sub_dir) }
Dir[File.join(Gem::Specification.find_by_name("devise_token_auth").gem_dir, "app", '*')].each { |sub_dir| $LOAD_PATH.push(sub_dir) }

unless defined?(ApplicationController)
  class ApplicationController < ActionController::Base
  end
end

unless defined?(DeviseTokenAuth::Concerns)
  module DeviseTokenAuth::Concerns
  end
end

require 'users/roles'
require 'user'
require 'identity'

require 'graphql/identity/type'
require 'graphql/identity/filter'
require 'graphql/identity/queries'
require 'graphql/identity/mutations'

require 'graphql/user/filter'
require 'graphql/user/type'
require 'graphql/user/queries'
require 'graphql/user/mutations'

require 'core/auth/authenticated_api_controller'
require 'core/auth/omniauth_callbacks_controller'
require 'core/auth/action_cable'
require 'core/auth/schema_plugin'

require 'test/fabricators/user_fabricator'