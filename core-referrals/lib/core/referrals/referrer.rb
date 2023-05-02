# frozen_string_literal: true

module Core
  module Referrals
    class Referrer < ActiveRecord::Base
      self.table_name = 'core_referrers'

      belongs_to :referrer, polymorphic: true
      has_many :referrals, foreign_key: 'core_referrer_id', class_name: 'Core::Referrals::Referral'

      before_validation :set_defaults, on: :create

      validates :code, presence: true, uniqueness: true
      validates :referrer, presence: true

      def set_defaults
        self.code ||= SecureRandom.hex
      end
    end
  end
end
