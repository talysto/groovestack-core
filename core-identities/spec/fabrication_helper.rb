# frozen_string_literal: true

# Add fabricators directory to load path if not already included
fabricators_path = File.expand_path('../fabricators', __dir__)
$LOAD_PATH.unshift(fabricators_path) unless $LOAD_PATH.include?(fabricators_path)

require 'fabrication'
require 'faker'
require 'user_fabricator'
