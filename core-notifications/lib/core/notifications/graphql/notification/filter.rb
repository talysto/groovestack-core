# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        class Filter < ::Core::Base::GraphQL::BaseInputObject
          description 'notification filter props'

          argument :ids, [ID], required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.ids
          argument :q, String, required: false, description: ::Core::Base::GraphQL::Documentation::Arguments.q
          argument :expired, Boolean, required: false, default_value: false, description: 'only expired notifications. default value is active (published and not expired)'
          argument :read, Boolean, required: false, description: 'notification read filter. if nil, return all. if true, return read. if false, return unread'
          argument :to_ids, [ID], required: false, description: 'notification to ids'
          argument :type, [String], required: false, description: 'notification type'
        end
      end
    end
  end
end
