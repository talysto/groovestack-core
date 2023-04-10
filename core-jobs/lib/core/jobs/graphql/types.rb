# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Types
        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class BaseInputObject < ::GraphQL::Schema::InputObject
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        class Job < BaseObject
          description 'A background job'

          field :actions, [String], null: false
          field :id, ID, null: false
          field :job_class, String, null: false
          field :priority, Integer, null: false
          field :queue, String, null: false
          field :status, String, null: false
          field :type, String, null: false

          field :error_count, Integer, null: true
          field :last_error_backtrace, String, null: true
          field :last_error_message, String, null: true

          field :args, ::GraphQL::Types::JSON, null: true
          field :data, ::GraphQL::Types::JSON, null: true
          field :kwargs, ::GraphQL::Types::JSON, null: true

          field :expired_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :finished_at, ::GraphQL::Types::ISO8601DateTime, null: true
          field :run_at, ::GraphQL::Types::ISO8601DateTime, null: true

          def queue
            object.args[0]['queue_name']
          end

          def type
            object.args[0]['job_class']
          end
        end

        class JobListMetadata < BaseObject
          field :count, Int, null: false
        end

        class JobReport < BaseObject
          description 'a job report'

          field :data, ::GraphQL::Types::JSON, null: false
          field :id, String, null: false
        end

        class JobReportMetadata < BaseObject
          field :count, Int, null: false
        end

        class Locker < BaseObject
          description 'A queue locker'

          field :id, String, null: false, method: :pid
          field :listening, Boolean, null: true
          field :pid, String, null: true
          field :queues, [String], null: true
          field :ruby_pid, Integer, null: true
          field :workers, Integer, null: true, method: :worker_count
          # field :worker_priorities, [Integer], null: true

          field :host, String, null: true, method: :ruby_hostname
        end

        class LockerMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end
