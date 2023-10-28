# frozen_string_literal: true

require 'graphql'
require 'pg'

require 'core/base/utilities/string'

require 'core/base/version'
require 'core/base/puma/plugin/core_cron'
require 'core/base/railtie' if defined?(Rails::Railtie)

require 'core/base/graphql/subscriptions/event_handler'
require 'core/base/graphql/types'
require 'core/base/graphql/base_input_object'
require 'core/base/graphql/base_mutation'
require 'core/base/graphql/documentation'
require 'core/base/graphql/base_subscription'

require 'core/base/graphql/providers/react_admin/resource'
require 'core/base/graphql/providers/react_admin/types'

require 'core/base/listeners'

require 'core/base/pub_sub' if defined?(Wisper)