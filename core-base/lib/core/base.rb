# frozen_string_literal: true

require 'graphql'
require 'pg'

require 'core/base/utilities/string'

require 'core/base/version'
require 'core/base/railtie' if defined?(Rails::Railtie)

require 'core/base/listeners/database'

require 'core/base/graphql/trigger_handler'
require 'core/base/graphql/types'
require 'core/base/graphql/base_input_object'
require 'core/base/graphql/base_mutation'
require 'core/base/graphql/base_object'
require 'core/base/graphql/documentation'
require 'core/base/graphql/base_subscription'

require 'core/base/graphql/providers/react_admin/resource'
require 'core/base/graphql/providers/react_admin/types'

if defined?(Wisper)
  require 'core/base/publishers/graphql_hub'
  require 'core/base/subscribers/graphql_trigger'
  require 'core/base/listener'
end

ActiveSupport.on_load(:after_initialize) do
  ::Core::Base::Publishers::GraphQLHub.subscribe(::Core::Base::Subscribers::GraphqlTrigger.new) if defined?(Wisper)
end