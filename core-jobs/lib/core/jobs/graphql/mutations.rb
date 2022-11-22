module Core
  module Jobs
    module GraphQL
      module Mutations
        module Job
          class Delete < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true

            type ::Core::Jobs::GraphQL::JobType

            def resolve(id:)
              job = ::Core::Job.find(id)
              job.destroy!
            end
          end

          class Update < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true
            argument :fire_retry, Boolean, required: false
            argument :performed_at, String, required: false
            argument :finished_at, String, required: false
            argument :error, String, required: false

            type ::Core::Jobs::GraphQL::JobType

            def resolve(id:, fire_retry:, **attrs)
              job = ::Core::Job::Job.find(id)

              if fire_retry
                job.retry!
              else
                job.update!(attrs)
              end

              job
            end
          end

          extend ActiveSupport::Concern

          included do
            # field :createForm, mutation: Core::Job::GraphQL::Mutations::Form::Create
            field :deleteJob, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Delete
            field :updateJob, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Update
          end
        end
      end
    end
  end
end