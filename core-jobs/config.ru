# frozen_string_literal: true

require "rubygems"
require "bundler"

Bundler.require :default, :development

Combustion.schema_format = :sql
Combustion.initialize!  :active_record

# Combustion.initialize! :all
run Combustion::Application

# override default of 15
Que::Job.maximum_retry_count = 5
