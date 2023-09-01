# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Mutations
          class Delete < ::Core::Base::GraphQL::BaseMutation
            description 'Delete a job'

            argument :id, ID, required: true, description: 'job id'

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:)
              job = ::Core::Jobs::Job.find(id)
              job.destroy!
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
              job.update!(attrs)
              job
            end
          end

          extend ActiveSupport::Concern

          included do
            field :delete_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Delete, description: 'Delete a job'
            field :update_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Update, description: 'Update a job'
          end
        end
      end
    end
  end
end
