# frozen_string_literal: true

require 'ostruct'

module Groovestack
  module Base
    module GraphQL
      module Documentation
        # rubocop:disable Style/OpenStructUse
        Fields = OpenStruct.new({
                                  created_at: 'time of record creation',
                                  id: 'a unique record identifier',
                                  relation_count: 'total number of records in a given scope',
                                  updated_at: 'time of last record update'
                                })
        # rubocop:enable Style/OpenStructUse
      end
    end
  end
end
