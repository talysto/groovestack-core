# frozen_string_literal: true

module Core
  module Referrals
    module HasCoreReferrals
      extend ActiveSupport::Concern

      included do
        has_many :core_referrers, as: :referrer, class_name: 'Core::Referrals::Referrer'
        has_many :core_referrals, as: :referred, class_name: 'Core::Referrals::Referral'

        def ensure_referrer!
          core_referrers.first_or_create!
        end

        def create_referral!(referred)
          referrer = ensure_referrer!
          referrer.referrals.create!(referred: referred)
        end
      end
    end
  end
end
