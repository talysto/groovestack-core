# frozen_string_literal: true

require "rubygems"
require "bundler"

Bundler.require :default, :development

Combustion.schema_format = :sql
Combustion.initialize!  :active_record

# Combustion.initialize! :all
run Combustion::Application
