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

            unless filter.expired
              # default
              scope = scope.active
            else
              scope = scope.expired 
            end

            scope = scope.where(id: ::Core::Notifications::Notification.to(filter.to_id)) if filter.to_id.present?
            
            unless filter.read 
              # default is unread 
              scope = scope.unread(filter.to_id)
            else
              scope = scope.read_by(filter.to_id)
            end

            # TODO add support for filter.q

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
