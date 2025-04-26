# frozen_string_literal: true

require_relative 'identities/version'

require 'groovestack/base'
require 'users/roles'
require 'user'
require 'identity'

require 'groovestack/identities/railtie' if defined?(Rails::Railtie)

# Load fabricators if Fabrication and Faker are available and we're not in a testing context
# This prevents circular requires between spec_helper and this file
if defined?(Fabrication) && defined?(Faker) && $LOADED_FEATURES.grep(/spec_helper/).none?
  begin
    require 'user_fabricator'
  rescue LoadError
    # Do nothing if fabricator can't be loaded - it's optional for regular usage
  end
end

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

module Groovestack
  module Identities
    class Error < StandardError; end
    # Your code goes here...
  end
end
