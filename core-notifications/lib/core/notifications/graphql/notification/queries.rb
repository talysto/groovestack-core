# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        module Queries
          extend ActiveSupport::Concern

          included do
            include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

            react_admin_resource :notifications, class_name: 'Core::Notifications::Notification', graphql_path: 'Core::Notifications::GraphQL'
          end

          def notifications_scope(sort_field: nil, sort_order: nil, filter: {})
            scope = ::Core::Notifications::Notification.unscoped
            scope = scope.where(id: filter.ids) unless filter.ids.nil?
            scope = scope.where(type: filter.type) unless filter.type.nil?
            scope = scope.where(to_id: filter.to_id) unless filter.to_id.nil?
            # scope = scope.where(ids: filter.ids) unless filter.q.nil? # TODO

            return scope if sort_field.blank?

            # support sort by association attrs
            _association, sort_field = sort_field.split('.') if sort_field.include?('.')
            scope.order({ sort_field.underscore => sort_order || 'desc' })
          end
        end
      end
    end
  end
end
