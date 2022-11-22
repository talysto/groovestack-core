module Core
  module Jobs
    module GraphQL
      module Job
        class Type < ::GraphQL::Schema::Object
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
      end
    end
  end
end