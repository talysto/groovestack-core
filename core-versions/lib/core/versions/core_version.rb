module Core
  module Versions
    class CoreVersion < PaperTrail::Version
      self.table_name = 'versions'

      # alias_method :has_core_versions, :has_paper_trail
    end
  end
end
