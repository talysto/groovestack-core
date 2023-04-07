require 'paper_trail/frameworks/active_record'

module Core
  module Versions
    class Version < PaperTrail::Version
      MASKED_ATTRIBUTE_STRINGS = [
        'password',
        'id'
      ]

      NONSERIALIZED_ATTRIBUTE_STRINGS = [
        'token'
      ]
    end
  end
end
