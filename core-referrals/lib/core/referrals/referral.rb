# frozen_string_literal: true

module Core
  module Referrals
    class Referral < ActiveRecord::Base
      self.table_name = 'core_referrals'

      belongs_to :referral_code, foreign_key: 'core_referral_code_id', class_name: 'Core::Referrals::ReferralCode', counter_cache: :referrals_count
      belongs_to :referred, polymorphic: true

      validates :referral_code, presence: true
      validates :referred, presence: true
    end
  end
end
