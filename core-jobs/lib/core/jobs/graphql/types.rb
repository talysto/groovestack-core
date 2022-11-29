module Core
  module Jobs
    module GraphQL
      module Types
        class Job < ::GraphQL::Schema::Object
          description 'A background job'

          field :id, ID, null: false
          field :priority, Integer, null: false
          field :job_class, String, null: false
          field :type, String, null: false
          field :queue, String, null: false
          field :status, String, null: false


          field :last_error_backtrace, String, null: true
          field :last_error_message, String, null: true
          field :error_count, Integer, null: true

          field :args, ::GraphQL::Types::JSON, null: true
          field :data, ::GraphQL::Types::JSON, null: true
          field :kwargs, ::GraphQL::Types::JSON, null: true

          field :run_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :expired_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :finished_at, ::GraphQL::Types::ISO8601DateTime, null: true

          def queue
            object.args[0]['queue_name']
          end

          def type
            object.args[0]['job_class']
          end
        end

        class JobListMetadata < ::GraphQL::Schema::Object
          field :count, Int, null: false
        end

        class Locker < ::GraphQL::Schema::Object
          description 'A queue locker'

          field :listening, Bool, null: false
          field :pid, String, null: false
          field :queues, [String], null: false
          field :ruby_pid, Integer, null: false
          field :workers, Integer, null: false
          field :worker_priorities, [Integer], null: false

          field :host, String, null: false 

          def host 
            object.ruby_hostname
          end

          def workers
            object.worker_count
          end
        end

        class LockerMetadata < ::GraphQL::Schema::Object
          field :count, Int, null: false
        end
      end
    end
  end
end