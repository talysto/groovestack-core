# frozen_string_literal: true

module Core
  module Referrals
    class Referral < ActiveRecord::Base
      self.table_name = 'core_referrals'
    end
  end
end
