require 'paper_trail/frameworks/active_record'

module Core
  module Versions
    class Version < PaperTrail::Version
      self.table_name = 'versions'
    end
  end
end