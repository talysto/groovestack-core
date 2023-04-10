# frozen_string_literal: true

require 'double_entry'

AQD = {
  priority: 1,
  iso_code: 'AQD',
  iso_numeric: '888',
  name: 'AQD',
  symbol: '$',
  subunit: 'NA',
  subunit_to_unit: 1,
  symbol_first: true,
  decimal_mark: '.',
  thousands_separator: ',',
  smallest_denomination: 1
}.freeze

Money::Currency.register(AQD)

DoubleEntry.configure do |config|
  # Use json(b) column in double_entry_lines table to store metadata instead of separate metadata table
  config.json_metadata = true

  config.define_accounts do |accounts|
    user_scope = lambda do |object|
      return object.id if object.instance_of?(User)
      return object if User.exists?(id: object)
      raise "Account must be scoped by 'User' not '#{object.class}/#{object}'" unless object.instance_of?(User)
    end

    org_scope = lambda do |object|
      return object.id if object.instance_of?(OrgUnit)
      return object if OrgUnit.exists?(id: object)
      raise "Account must be scoped by 'OrgUnit' not '#{object.class}/#{object}'" unless object.instance_of?(OrgUnit)
    end

    accounts.define(identifier: :savings,  scope_identifier: user_scope, positive_only: true)
    accounts.define(identifier: :checking, scope_identifier: user_scope)

    accounts.define(identifier: :aqd_treasury, scope_identifier: org_scope, currency: 'AQD') # atmos AQD treasuries
    accounts.define(identifier: :aqd_tokens, scope_identifier: user_scope, currency: 'AQD', positive_only: true)
  end

  config.define_transfers do |transfers|
    transfers.define(from: :checking, to: :savings,  code: :deposit)
    transfers.define(from: :savings,  to: :checking, code: :withdraw)

    transfers.define(from: :aqd_treasury, to: :aqd_tokens, code: :buy_aqd)
    transfers.define(from: :aqd_tokens, to: :aqd_treasury, code: :spend_aqd)
  end
end

# u1 = User.first

# DoubleEntry.lock_accounts(u1.account_savings, u1.account_checking) do
# DoubleEntry.transfer(
#   Money.new(15_00),
#   from: u1.account_savings,
#   to:   u1.account_checking,
#   code: :withdraw,
#   detail: Thing.all.sample,
#   metadata: {key1: ['value 1', 'value 2'], key2: 'value 3'}
# )
# end

# o1 = OrgUnit.first

# DoubleEntry.transfer(
#   Money.new(15_00, 'AQD'),
#   from: o1.account_aqd_treasury,
#   to:   u1.account_aqd_tokens,
#   code: :buy_aqd
# )

# DoubleEntry.transfer(
#   Money.new(10_00, 'AQD'),
#   from: u1.account_aqd_tokens,
#   to:   o1.account_aqd_treasury,
#   code: :spend_aqd
# )

module DoubleEntry
  class Line < ActiveRecord::Base
    jsonb_accessor :metadata,
                   key1: [:string, { array: true, default: [] }],
                   key2: :string
  end
end

module Core
  module Accounting
    module GraphQL
      module Types
        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class Line < BaseObject
          field :account_identifier, String, null: false
          field :scope_detail, ::GraphQL::Types::JSON, null: false
          field :key1, [String], null: false
          field :key2, String, null: true

          def account_identifier
            object.account.identifier
          end

          def scope_detail
            {
              model: %i[aqd_tokens savings checking].include?(object.account.identifier) ? 'User' : 'OrgUnit',
              id: object.scope
            }
          end
        end
      end
    end
  end
end
