# frozen_string_literal: true

module Core
  module Notifications
    class Notification < ActiveRecord::Base
      self.table_name = 'core_notifications'
      
      validates :type, presence: true
      validates :title, presence: true
      validates :description, presence: true
      validates :to_type, presence: true

      belongs_to :from, polymorphic: true, optional: true
      belongs_to :object, polymorphic: true, optional: true

      def permitted_update!(**attrs)
        raise "subclass must define this method"
      end
    end
  end
end
