module Core
  module Activities
    module GraphQL
      module Activity
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'Activity filter props'

          argument :ids, [ID], required: false

          argument :actor_id, ID, required: false
          argument :actor_type, String, required: false
          # Warning about object_id column collisions with ruby object_id method
          # argument :object_id, ID, required: false
          argument :object_type, String, required: false
          argument :resource_id, ID, required: false
          argument :target_id, ID, required: false
          argument :target_type, String, required: false
          argument :type, String, required: false
        end
      end
    end
  end
end
