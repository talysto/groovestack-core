# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Mutations
          class BulkDelete < ::Core::Base::GraphQL::BaseMutation
            description 'Delete jobs'

            argument :ids, [ID], required: false, description: 'job ids'
            argument :meta, ::GraphQL::Types::JSON, required: false, description: 'meta data'

            field :ids, [ID], null: false, description: 'delete job ids', camelize: false

            def resolve(ids: [], meta: nil)
              {
                ids: ::Core::Jobs::Job.purge(ids, *[meta&.dig("params", "job_scope")].compact) # if no ids or job_scope provided, want the default purge job_scope to be used
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

            argument :instance_method, String, required: false, description: 'instance method to trigger on a job'
            argument :instance_method_args, ::GraphQL::Types::JSON, required: false, description: 'instance method args to trigger on a job'

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:, instance_method:, instance_method_args:, **attrs)
              job = ::Core::Jobs::Job.find(id)

              if instance_method.present?                 
                if instance_method_args.present?
                  job.send(instance_method, **instance_method_args.symbolize_keys!)
                else
                  job.send(instance_method)
                end
              else
                QueJob.update!(id, **attrs)
              end
              job
            end
          end

          extend ActiveSupport::Concern

          included do
            field :delete_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Delete, description: 'Delete a job'
            field :delete_many_jobs, mutation: ::Core::Jobs::GraphQL::Job::Mutations::BulkDelete, description: 'Delete jobs'
            field :update_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Update, description: 'Update a job'
          end
        end
      end
    end
  end
end
