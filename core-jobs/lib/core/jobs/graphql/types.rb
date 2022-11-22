module Core
  module Jobs
    module GraphQL
      module Types
        class Job < ::GraphQL::Schema::Object
          description 'A background job'

          field :id, ID, null: false
          field :queue_name, String, null: false
          field :priority, Integer, null: true

          # field :serialized_params, Integer, null: true

          field :error, String, null: true
          field :status, String, null: false
          field :summary, String, null: true

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :scheduled_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :performed_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :finished_at, ::GraphQL::Types::ISO8601DateTime, null: true

          # associations
          # field :notifications, [::Types::Notification], null: false
        end

        class JobListMetadata < ::GraphQL::Schema::Object
          field :count, Int, null: false
        end
      end
    end
  end
end