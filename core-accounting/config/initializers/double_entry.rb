# frozen_string_literal: true

require 'double_entry'

module DoubleEntry
  class Configuration
    # intended as a hash mapping for account scopes to model names
    # ex:
    #   config.account_scope_identifier_mapping = {
    #     aqd_treasury: 'OrgUnit',
    #     aqd_tokens: 'User'
    #   }
    # AFAICT scope identifier classes can't be pulled directly
    # from account.scope_identifier

    attr_accessor :account_scope_identifier_mapping
  end
end

DoubleEntry.configure do |config|
  config.json_metadata = true
  config.scope_identifier_max_length = 1024
  config.account_identifier_max_length = 1024
end

module DoubleEntry
  class Line < ApplicationRecord
    scope :credits, -> { where('amount > 0') }
    scope :debits, -> { where('amount < 0') }
  end
end
