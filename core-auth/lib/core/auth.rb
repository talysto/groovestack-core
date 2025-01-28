# frozen_string_literal: true

require 'active_record'
require 'dry-configurable'

require 'core/auth/version'
require 'core/auth/railtie' if defined?(Rails::Railtie)

unless defined?(ApplicationController)
  class ApplicationController < ActionController::Base
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
    autoload :ActionCable, 'core/auth/action_cable'

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

require 'test/fabricators/user_fabricator' if defined?(Fabrication) && defined?(Faker)