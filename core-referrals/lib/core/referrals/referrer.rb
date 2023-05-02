# frozen_string_literal: true

module Core
  module Referrals
    class Referrer < ActiveRecord::Base
      self.table_name = 'core_referrers'
    end
  end
end
