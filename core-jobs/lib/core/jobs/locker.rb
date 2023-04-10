# frozen_string_literal: true

module Core
  module Jobs
    class Locker < ApplicationRecord
      self.table_name = 'que_lockers'
    end
  end
end
