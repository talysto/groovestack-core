module Core
  module Webhooks
    module GraphQL
      module Event
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'Webhook event filter props'

          argument :ids, [ID], required: false
          argument :q, String, required: false

          argument :event, String, required: false
          argument :source, String, required: false
          argument :status, String, required: false
        end
      end
    end
  end
end
