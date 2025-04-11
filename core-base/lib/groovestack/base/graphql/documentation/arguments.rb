# frozen_string_literal: true

require 'ostruct'

module Groovestack
  module Base
    module GraphQL
      module Documentation
        # rubocop:disable Style/OpenStructUse
        Arguments = OpenStruct.new({
                                     id: 'a unique record identifier',
                                     page: 'page number of the paginated results',
                                     per_page: 'number of records per page of the paginated results',
                                     sort_field: 'field to sort the results by (i.e. created_at)',
                                     sort_order: 'order with which to sort the results (i.e. ASC, DESC)',
                                     filter: 'hash of parameters by which to filter the results (i.e. { ids: [1,2,3] })'
                                   })
        # rubocop:enable Style/OpenStructUse
      end
    end
  end
end
