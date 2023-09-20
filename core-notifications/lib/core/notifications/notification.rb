# frozen_string_literal: true

module Core
  module Notifications
    class Notification < ActiveRecord::Base
      self.table_name = 'core_notifications'
      
    end
  end
end
