# frozen_string_literal: true

module Core
  module Referrals
    class Referral < ActiveRecord::Base
      self.table_name = 'core_referrals'

      belongs_to :core_referrer, foreign_key: 'core_referrer_id', class_name: 'Core::Referrals::Referrer'
      belongs_to :referred, polymorphic: true

      counter_culture :core_referrer

      validates :core_referrer, presence: true
      validates :referred, presence: true
    end
  end
end
