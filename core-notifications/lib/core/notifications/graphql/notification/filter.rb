# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'notification filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
        end
      end
    end
  end
end
