# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'que'
require 'core/jobs/version'
require 'active_record'
require 'que/active_record/model'

require 'core/jobs/puma/plugin/que'
require 'core/jobs/railtie' if defined?(Rails::Railtie)
require 'core/jobs/que_job_ext'
require 'core/jobs/job'
require 'core/jobs/locker'

require 'core/jobs/graphql/job/type'
require 'core/jobs/graphql/job/filter'
require 'core/jobs/graphql/job/queries'
require 'core/jobs/graphql/job/mutations'
require 'core/jobs/graphql/job/subscriptions'
require 'core/jobs/graphql/job/locker/type'
require 'core/jobs/graphql/job/locker/filter'
require 'core/jobs/graphql/job/locker/queries'
require 'core/jobs/graphql/job/report/type'
require 'core/jobs/graphql/job/report/filter'
require 'core/jobs/graphql/job/report/queries'
require 'core/jobs/graphql/job/report/subscriptions'

if defined?(Wisper)
  require 'core/jobs/pub_sub'
  require 'core/jobs/listeners'
end

# Dir["core/jobs/graphql/**/*.rb"].each { |file| require file }

module Core
  module Jobs
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Jobs::Error; end
    class DepPostgresRequired < Core::Jobs::Error; end
    class WrongActiveJobQueueAdapter < Core::Jobs::Error; end
  end
end
