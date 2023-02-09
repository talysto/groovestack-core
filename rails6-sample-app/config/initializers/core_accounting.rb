require 'double_entry'

DoubleEntry.configure do |config|
  # Use json(b) column in double_entry_lines table to store metadata instead of separate metadata table
  config.json_metadata = true

  config.define_accounts do |accounts|
    user_scope = lambda do |object|
      return object.id if object.instance_of?(User)
      return object if User.exists?(id: object)
      raise "Account must be scoped by 'User' not '#{object.class}/#{object}'" unless object.instance_of?(User)
    end

    accounts.define(identifier: :savings,  scope_identifier: user_scope, positive_only: true)
    accounts.define(identifier: :checking, scope_identifier: user_scope)
  end

  config.define_transfers do |transfers|
    transfers.define(from: :checking, to: :savings,  code: :deposit)
    transfers.define(from: :savings,  to: :checking, code: :withdraw)
  end
end

module DoubleEntry
  class Line < ActiveRecord::Base
    jsonb_accessor :metadata,
      key1: [:string, array: true, default: []],
      key2: :string
  end
end

module Core
  module Accounting
    module GraphQL
      module Types
        class Line < ::GraphQL::Schema::Object
          field :key1, [String], null: false 
          field :key2, String, null: true
        end
      end
    end
  end
end