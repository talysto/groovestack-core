# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'double_entry'
require 'core/accounting/version'
require 'active_record'
# require 'que/active_record/model'

# require 'core/graphql/providers/react_admin/types'
# require 'core/graphql/providers/react_admin/resource'

# require 'core/jobs/puma/plugin/que'
require 'core/accounting/railtie' if defined?(Rails::Railtie)
# require 'core/jobs/job'
# require 'core/jobs/locker'
require 'core/accounting/graphql/types'
require 'core/accounting/graphql/filters'
# require 'core/accounting/graphql/mutations'
require 'core/accounting/graphql/queries'


# Dir["core/jobs/graphql/**/*.rb"].each { |file| require file }

module Core
  module Accounting
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Accounting::Error; end
    # class DepPostgresRequired < Core::Accounting::Error; end
    # class WrongActiveJobQueueAdapter < Core::Accounting::Error; end

    # Your code goes here...
  end

end


# if Rails.env.development?
#   Rails.application.console do
#     puts "Custom message here"
#   end
# end

