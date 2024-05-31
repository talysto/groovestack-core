# frozen_string_literal: true

module Core
  module Referrals
    module HasCoreReferrals
      extend ActiveSupport::Concern

      included do
        has_many :referral_codes, as: :referrer, class_name: 'Core::Referrals::ReferralCode'
        has_many :referrals, through: :referral_codes, class_name: 'Core::Referrals::Referral'

        def ensure_referral_code!
          referral_codes.first_or_create!
        end

        def create_referral!(referred)
          referral_code = ensure_referral_code!
          referral_code.referrals.create!(referred: referred)
        end
      end
    end
  end
end
