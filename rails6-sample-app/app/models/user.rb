class User < ApplicationRecord
  def account_savings
    DoubleEntry.account(:savings, scope: self)
  end

  def account_checking
    DoubleEntry.account(:checking, scope: self)
  end
end
