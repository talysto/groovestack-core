require "sinatra/activerecord"

module Core
  module Versions
    VERSION = '0.1.0'

    class Version < ActiveRecord::Base
      self.table_name = 'versions'

      def has_core_versions
        has_paper_trail
      end
    end
  end
end

