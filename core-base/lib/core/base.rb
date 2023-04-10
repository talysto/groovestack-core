# frozen_string_literal: true

require 'core/base/version'
require 'core/base/railtie' if defined?(Rails::Railtie)

require 'core/base/graphql/documentation'
require 'core/base/graphql/providers/react_admin/resource'
require 'core/base/graphql/providers/react_admin/types'
require 'core/base/graphql/types/base_argument'
require 'core/base/graphql/types/base_field'
