# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'active_record'

require 'core/comments/railtie' if defined?(Rails::Railtie)
require 'core/comments/comment'
require 'core/comments/version'
require 'core/comments/graphql/types'
require 'core/comments/graphql/filters'
require 'core/comments/graphql/mutations'
require 'core/comments/graphql/queries'


# Dir["core/jobs/graphql/**/*.rb"].each { |file| require file }

module Core
  module Comments
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Comments::Error; end
    # class DepPostgresRequired < Core::Comments::Error; end

    # Your code goes here...
  end
end


# if Rails.env.development?
#   Rails.application.console do
#     puts "Custom message here"
#   end
# end
