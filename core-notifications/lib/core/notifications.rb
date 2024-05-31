# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'core/notifications/version'
require 'active_record'

require 'core/notifications/railtie' if defined?(Rails::Railtie)

require 'core/notifications/notification'
require 'core/notifications/simple'
require 'core/notifications/task'
require 'core/notifications/global'
require 'test/fabricators/notification_fabricator' if defined?(Fabrication) && defined?(Faker)

require 'core/notifications/graphql/notification/type'
require 'core/notifications/graphql/notification/filter'
require 'core/notifications/graphql/notification/queries'
require 'core/notifications/graphql/notification/mutations'
require 'core/notifications/graphql/notification/subscriptions'

require 'core/notifications/pub_sub' if defined?(Wisper::ActiveRecord)

module Core
  module Notifications
    class Error < StandardError; end
  end
end
