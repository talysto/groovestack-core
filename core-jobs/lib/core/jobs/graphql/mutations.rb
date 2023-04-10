# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Mutations
        class BaseMutation < ::GraphQL::Schema::Mutation
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        module Job
          class Delete < BaseMutation
            argument :id, ID, required: true

            type ::Core::Jobs::GraphQL::Types::Job

            def resolve(id:)
              job = ::Core::Jobs::Job.find(id)
              job.destroy!
            end
          end

          class Update < BaseMutation
            argument :expired_at, ::GraphQL::Types::ISO8601DateTime, required: false
            argument :id, ID, required: true
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
          field :delete_job, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Delete
          field :update_job, mutation: ::Core::Jobs::GraphQL::Mutations::Job::Update
        end
      end
    end
  end
end
