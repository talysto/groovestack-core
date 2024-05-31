# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Queries
          extend ActiveSupport::Concern

          included do
            include ::Core::Base::GraphQL::Providers::ReactAdmin::Resource
            include ::Core::Jobs::GraphQL::Job::Locker::Queries
            include ::Core::Jobs::GraphQL::Job::Report::Queries

            react_admin_resource :jobs, class_name: 'Core::Jobs::Job', graphql_path: 'Core::Jobs::GraphQL', except: [:find]

            field :Job, ::Core::Jobs::GraphQL::Job::Type, null: true, resolver_method: :Job,
                                                          description: "Find Job." do
              argument :id, ::GraphQL::Types::ID, required: true, description: ::Core::Base::GraphQL::Documentation::Arguments.id
            end
          end

          def Job(id:)
            # NOTE:
            # Core::Jobs::Job overrides find b/c no primary key on que_jobs_ext view
            # Need custom find query to use the overriden method
            # (Core::Jobs::Job.unscope, the base_scope in the react_admin_resource
            # provider, does not work with the overriden find method)

            ::Core::Jobs::Job.find id
          end

          def jobs_scope(base_scope:, sort_field: nil, sort_order: nil, filter: {})
            scope = base_scope
            scope = scope.where(id: filter.ids) unless filter.ids.nil?
            scope = scope.where(sub_class: filter.sub_class) if filter.sub_class.present?
            scope = scope.where('sub_class ilike ?', "%#{filter.q}%") if filter.q.present?
            scope = scope.where(status: filter.status) if filter.status.present?

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
