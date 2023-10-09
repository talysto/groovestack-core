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

              react_admin_resource :job_lockers, graphql_type: 'Core::Jobs::GraphQL::Job::Locker::Type',
              graphql_filter: 'Core::Jobs::GraphQL::Job::Locker::Filter'
            end

            def job_lockers_scope(sort_field: nil, sort_order: nil, filter: {})
              scope = ::Core::Jobs::Locker.unscoped
              # scope = scope.where(id: filter.ids) unless filter.ids.nil?

              return scope if sort_field.blank? || sort_field == 'id' # no id on this table

              scope.order({ sort_field.underscore => sort_order || 'desc' })
            end
          end
        end
      end
    end
  end
end
