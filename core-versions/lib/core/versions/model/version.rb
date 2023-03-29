require "paper_trail/frameworks/active_record"

module Core
  module Versions
    class Version < PaperTrail::Version
      self.table_name = 'versions'

      def self.has_core_versions
        return has_paper_trail
      end
    end
  end
end