# frozen_string_literal: true

require 'paper_trail/frameworks/active_record'

module Core
  module Versions
    class Version < PaperTrail::Version
      MASKED_ATTRIBUTE_STRINGS = %w[
        password
        id
      ].freeze

      NONSERIALIZED_ATTRIBUTE_STRINGS = [
        'token'
      ].freeze
    end
  end
end
