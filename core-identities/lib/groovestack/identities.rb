# frozen_string_literal: true

require_relative 'identities/version'

require 'groovestack/base'
require 'users/roles'
require 'user'
require 'identity'

require 'groovestack/identities/railtie' if defined?(Rails::Railtie)

# Load fabricators if Fabrication and Faker are available
if defined?(Fabrication) && defined?(Faker)
  fabricator_path = File.expand_path('../../spec/fabricators/user_fabricator', __dir__)
  require fabricator_path
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
