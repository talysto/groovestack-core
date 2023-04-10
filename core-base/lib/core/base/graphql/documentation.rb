require "ostruct"

module Core
  module Base
    module GraphQL
      module Documentation
        Fields = OpenStruct.new({
          created_at: 'time of record creation',
          id: 'a unique record identifier',
          relation_count: 'total number of records in a given scope',
          updated_at: 'time of last record update'
        })
      end
    end
  end
end