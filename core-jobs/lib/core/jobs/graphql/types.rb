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

          field :actions, [String], null: false, description: 'actions'
          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.ids
          field :job_class, String, null: false, description: 'class of job'
          field :priority, Integer, null: false, description: 'job priority'
          field :queue, String, null: false, description: 'job queue'
          field :status, String, null: false, description: 'current status of job'
          field :type, String, null: false, description: 'job type'

          field :error_count, Integer, null: true, description: 'error count'
          field :last_error_backtrace, String, null: true, description: 'last error backtrace'
          field :last_error_message, String, null: true, description: 'last error message'

          field :args, ::GraphQL::Types::JSON, null: true, description: 'args'
          field :data, ::GraphQL::Types::JSON, null: true, description: 'data'
          field :kwargs, ::GraphQL::Types::JSON, null: true, description: 'keyword args'

          field :expired_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'expiration timestamp'
          field :finished_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'finished timestamp'
          field :run_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'start running timestamp'

          def queue
            object.args[0]['queue_name']
          end

          def type
            object.args[0]['job_class']
          end
        end

        class JobListMetadata < BaseObject
          field :count, Int, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.relation_count
        end

        class JobReport < BaseObject
          description 'a job report'

          field :data, ::GraphQL::Types::JSON, null: false, description: ''
          field :id, String, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.id
        end

        class JobReportMetadata < BaseObject
          field :count, Int, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.count
        end

        class Locker < BaseObject
          description 'A queue locker'

          field :id, String, null: false, method: :pid, description: ::Core::Base::GraphQL::Documentation::Fields.id
          field :listening, Boolean, null: true, description: 'listening'
          field :pid, String, null: true, description: 'process id'
          field :queues, [String], null: true, description: 'queues'
          field :ruby_pid, Integer, null: true, description: 'ruby process id'
          field :workers, Integer, null: true, method: :worker_count, description: 'workers'
          # field :worker_priorities, [Integer], null: true

          field :host, String, null: true, method: :ruby_hostname, description: 'host'
        end

        class LockerMetadata < BaseObject
          field :count, Int, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.relation_count
        end
      end
    end
  end
end
