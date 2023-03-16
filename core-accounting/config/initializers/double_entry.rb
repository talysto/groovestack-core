require 'double_entry'

DoubleEntry.configure do |config|
  config.json_metadata = true
  config.scope_identifier_max_length = 1024
  config.account_identifier_max_length = 1024
end

module DoubleEntry
  class Line < ActiveRecord::Base
    scope :credits, -> { where('amount > 0') }
    scope :debits, -> { where('amount < 0') }
  end
end