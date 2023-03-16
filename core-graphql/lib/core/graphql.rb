# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'core/graphql/version'

require 'core/graphql/providers/react_admin/types'
require 'core/graphql/providers/react_admin/resource'

require 'core/graphql/railtie' if defined?(Rails::Railtie)