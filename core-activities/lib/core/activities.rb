# frozen_string_literal: true

require 'dry-configurable'
require 'wisper/activerecord'
require 'active_record'

require_relative "activities/version"
require_relative "activities/railtie" if defined?(Rails)

module Core
  module Activities
    class Error < StandardError; end

    autoload :Activity, 'core/activities/activity'

    module GraphQL
      module Activity 
        autoload :Type, 'core/activities/graphql/activity/type'
        autoload :Filter, 'core/activities/graphql/activity/filter'
        autoload :Queries, 'core/activities/graphql/activity/queries'
      end
    end 
  end
end
