# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
require 'sinatra/activerecord'

require 'active_record'
require 'core/versions/railtie' if defined?(Rails::Railtie)
require 'core/versions/version'
require 'core/versions/engine'

# Dir["core/versions/graphql/**/*.rb"].each { |file| require file }

module Core
  module Versions
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Versions::Error; end
  end
end


# if Rails.env.development?
#   Rails.application.console do
#     puts "Custom message here"
#   end
# end
