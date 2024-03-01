# frozen_string_literal: true

require 'active_record'
require 'dry-configurable'
require 'graphql_devise'
require 'omniauth-google-oauth2'
require 'omniauth-apple'

require 'core/auth/version'
require 'core/auth/railtie' if defined?(Rails::Railtie)

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

module GraphQL
  module Identity
    autoload :Type, 'graphql/identity/type'
    autoload :Filter, 'graphql/identity/filter'
    autoload :Queries, 'graphql/identity/queries'
    autoload :Mutations, 'graphql/identity/mutations'
  end

  module User
    autoload :Filter, 'graphql/user/filter'
    autoload :Type, 'graphql/user/type'
    autoload :Queries, 'graphql/user/queries'
    autoload :Mutations, 'graphql/user/mutations'
  end
end

module Core
  module Auth
    autoload :Provider, 'core/auth/provider'
    autoload :AuthenticatedApiController, 'core/auth/authenticated_api_controller'
    autoload :OmniauthCallbacksController, 'core/auth/omniauth_callbacks_controller'
    autoload :ActionCable, 'core/auth/action_cable'
    autoload :SchemaPlugin, 'core/auth/schema_plugin'

    module Providers
      extend ActiveSupport::Autoload

      eager_autoload do
        autoload :Email, 'core/auth/providers/email'
        autoload :OmniAuth, 'core/auth/providers/omni_auth'
        autoload :Apple, 'core/auth/providers/apple'
        autoload :Google, 'core/auth/providers/google'
      end
    end

    extend Dry::Configurable

    setting :disabled_providers, default: [], reader: true
  end
end

require 'test/fabricators/user_fabricator'