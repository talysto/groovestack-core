# frozen_string_literal: true

module Core
  module Referrals
    class ReferralCode < ActiveRecord::Base
      self.table_name = 'core_referral_codes'

      belongs_to :referrer, polymorphic: true
      has_many :referrals, foreign_key: 'core_referral_code_id', class_name: 'Core::Referrals::Referral'

      before_validation :set_defaults, on: :create

      validates :code, presence: true, uniqueness: true
      validates :referrer, presence: true

      def set_defaults
        self.code ||= generate_code
      end

      def generate_code
        Base32H.encode(Random.new.rand(999_999_999_999_999))
      end
    end
  end
end
