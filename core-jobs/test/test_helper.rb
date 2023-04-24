# frozen_string_literal: true

# Combustion-Minitest support:
# https://github.com/pat/combustion/issues/78
require 'combustion'
Combustion.path = 'test/internal'
Combustion.schema_format = :sql
Combustion.initialize! :active_record

$LOAD_PATH.unshift File.expand_path('../lib', __dir__)
require 'core/jobs'

# Or, load just what you need:
# Combustion.initialize! :active_record, :action_controller

require 'minitest/autorun'
