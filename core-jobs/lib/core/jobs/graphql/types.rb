module Core
  module Jobs
    module GraphQL
      module Types
        class Job < ::GraphQL::Schema::Object
          description 'A background job'

          field :id, ID, null: false
          field :priority, Integer, null: false
          field :job_class, String, null: false


          field :last_error_backtrace, String, null: true
          field :last_error_message, String, null: true
          field :error_count, Integer, null: true

          field :args, ::GraphQL::Types::JSON, null: true
          field :data, ::GraphQL::Types::JSON, null: true
          field :kwargs, ::GraphQL::Types::JSON, null: true

          field :run_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :expired_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :finished_at, ::GraphQL::Types::ISO8601DateTime, null: true
        end

        class JobListMetadata < ::GraphQL::Schema::Object
          field :count, Int, null: false
        end
      end
    end
  end
end