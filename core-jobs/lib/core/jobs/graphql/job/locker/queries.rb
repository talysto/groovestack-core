# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job 
        module Locker
          module Queries
            extend ActiveSupport::Concern

            included do
              include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource

              react_admin_resource :lockers, class_name: "Core::Jobs::Locker", graphql_path: "Core::Jobs::GraphQL::Job"
            end

            def lockers_scope(sort_field: nil, sort_order: nil, filter: {})
              scope = ::Core::Jobs::Locker.unscoped
              scope = scope.where(id: filter.ids) unless filter.ids.nil?

              return scope if sort_field.blank?

              scope.order({ sort_field.underscore => sort_order || 'desc' })
            end
          end
        end
      end
    end
  end
end
