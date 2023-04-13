# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Mutations
          class Delete < ::Core::Base::GraphQL::BaseMutation
            argument :id, ID, required: true

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:)
              job = ::Core::Jobs::Job.find(id)
              job.destroy!
            end
          end

          class Update < ::Core::Base::GraphQL::BaseMutation
            argument :expired_at, ::GraphQL::Types::ISO8601DateTime, required: false
            argument :id, ID, required: true
            argument :run_at, ::GraphQL::Types::ISO8601DateTime, required: false

            type ::Core::Jobs::GraphQL::Job::Type

            def resolve(id:, **attrs)
              job = ::Core::Jobs::Job.find(id)
              job.update!(attrs)
              job
            end
          end

          extend ActiveSupport::Concern

          included do
            field :delete_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Delete
            field :update_job, mutation: ::Core::Jobs::GraphQL::Job::Mutations::Update
          end
        end
      end
    end
  end
end
