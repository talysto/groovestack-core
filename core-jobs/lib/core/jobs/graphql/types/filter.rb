module Core
  module Jobs
    module GraphQL
      module Types
        module Filter
          class JobFilter < ::Types::Base::InputObject
            description 'job filter props'
            argument :q, String, required: false
            argument :ids, [ID], required: false
            argument :status, String, required: false
          end
        end
      end
    end
  end
end