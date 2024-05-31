# frozen_string_literal: true

require 'base32h'
require 'active_record'

require 'core/referrals/railtie' if defined?(Rails::Railtie)

require_relative "referrals/version"

module Core
  module Referrals
    autoload :Referral, 'core/referrals/referral'
    autoload :ReferralCode, 'core/referrals/referral_code'
    autoload :HasCoreReferrals, 'core/referrals/has_core_referrals'

    class Error < StandardError; end
  end
end
