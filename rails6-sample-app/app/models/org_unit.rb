class OrgUnit < ApplicationRecord
  has_closure_tree

  def account_aqd_treasury
    DoubleEntry.account(:aqd_treasury, scope: self)
  end
end
