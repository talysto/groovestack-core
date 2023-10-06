# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Mutations
          class BulkDelete < ::Core::Base::GraphQL::BaseMutation
            description 'Delete jobs'

            argument :job_scope, String, required: false, description: 'jobs to bulk delete'

            field :deleted_count, Integer, null: false, description: 'number of jobs deleted', camelize: false

            def resolve(**args)
              {
                deleted_count: ::Core::Jobs::Job.purge(*[args[:job_scope]].compact) # splat so that when nil is passed (i.e. job scope isn't defined), purge will use default scope
              }
            end
          end

          class Delete < ::Core::Base::GraphQL::BaseMutation
            description 'Delete a job'

            argument :id, ID, required: true, description: 'job id'

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:)
              job = ::Core::Jobs::Job.find(id)
              QueJob.destroy(id)
              job
            end
          end

          class Update < ::Core::Base::GraphQL::BaseMutation
            description 'Update a job'

            argument :expired_at, ::GraphQL::Types::ISO8601DateTime, required: false,
                                                                     description: 'expiration timestamp'
            argument :id, ID, required: true, description: 'job id'
            argument :run_at, ::GraphQL::Types::ISO8601DateTime, required: false, description: 'start running timestamp'

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:, **attrs)
              job = ::Core::Jobs::Job.find(id)
              QueJob.update!(id, **attrs)
              job
            end
          end

          extend ActiveSupport::Concern

          included do
            field :delete_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Delete, description: 'Delete a job'
            field :update_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Update, description: 'Update a job'
            field :bulk_delete_jobs, mutation: ::Core::Jobs::GraphQL::Job::Mutations::BulkDelete, description: 'Delete jobs'
          end
        end
      end
    end
  end
end
