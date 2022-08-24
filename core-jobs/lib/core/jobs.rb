# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'que'
require 'core/jobs/version'
require 'active_record'
require 'que/active_record/model'

require 'core/jobs/railtie'
require 'core/jobs/job'

module Core
  module Jobs
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Jobs::Error; end
    class DepPostgresRequired < Core::Jobs::Error; end

    # Your code goes here...
  end

end


# if Rails.env.development?
#   Rails.application.console do
#     puts "Custom message here"
#   end
# end

