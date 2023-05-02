# frozen_string_literal: true

class User < ApplicationRecord
  include Core::Referrals::HasCoreReferrals

  def account_savings
    DoubleEntry.account(:savings, scope: self)
  end

  def account_checking
    DoubleEntry.account(:checking, scope: self)
  end

  def account_aqd_tokens
    DoubleEntry.account(:aqd_tokens, scope: self)
  end
end
