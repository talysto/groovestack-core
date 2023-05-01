# frozen_string_literal: true

# This is needed for rake db:tasks to run.
# TODO: Determine if this can be refactored out or made conditional (not needed for production)
# or possible moved to environment-specific rb files
# require 'sinatra/activerecord'

require 'active_record'

require 'core/referrals/railtie' if defined?(Rails::Railtie)
require 'core/referrals/referral'
require 'core/referrals/referrer'
require 'core/referrals/version'

# Dir["core/jobs/graphql/**/*.rb"].each { |file| require file }

module Core
  module Referrals
    class Error < StandardError; end
    class WrongSchemaFormat < Core::Referrals::Error; end
  end
end

# if Rails.env.development?
#   Rails.application.console do
#     puts "Custom message here"
#   end
# end
