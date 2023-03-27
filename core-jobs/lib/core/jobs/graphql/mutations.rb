module Core
  module Jobs
    module GraphQL
      module Mutations
        module Job
          class Delete < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true

            type ::Core::Jobs::GraphQL::Types::Job

            def resolve(id:)
              job = ::Core::Jobs::Job.find(id)
              job.destroy!
            end
          end

          class Update < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true
            argument :expired_at, ::GraphQL::Types::ISO8601DateTime, required: false
            argument :run_at, ::GraphQL::Types::ISO8601DateTime, required: false

            type ::Core::Jobs::GraphQL::Types::Job

            def resolve(id:, **attrs)
              job = ::Core::Jobs::Job.find(id)
              job.update!(attrs)
              job
            end
          end
        end

        extend ActiveSupport::Concern

        included do
          field :deleteJob, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Delete
          field :updateJob, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Update
        end
      end
    end
  end
end
