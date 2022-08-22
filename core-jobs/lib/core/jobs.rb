# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'que'
require 'core/jobs/version'

module Core
  module Jobs
    class Error < StandardError; end
    # Your code goes here...
  end
end

# class App < Sinatra::Base
# end
