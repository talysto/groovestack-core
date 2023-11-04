# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'graphql_devise'
require 'omniauth-google-oauth2'

require 'core/auth/version'
require 'active_record'

require 'core/auth/railtie' if defined?(Rails::Railtie)

require 'core/auth/engine' if defined?(Rails::Engine)

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

module Core
  module Auth
    class Error < StandardError; end
  end
end
