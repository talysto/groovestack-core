# frozen_string_literal: true

module Core
  module Jobs
    module GraphQL
      module Job
        module Locker
          class Type < ::Core::Base::GraphQL::BaseObject
            description 'A queue locker'

            # field :id, String, null: false, method: :pid, description: ::Core::Base::GraphQL::Documentation::Fields.id
            field :listening, Boolean, null: true, description: 'listening'
            field :pid, String, null: true, description: 'process id'
            field :queues, [String], null: true, description: 'queues'
            field :ruby_pid, Integer, null: true, description: 'ruby process id'
            field :workers, Integer, null: true, method: :worker_count, description: 'workers'
            # field :worker_priorities, [Integer], null: true

            field :host, String, null: true, method: :ruby_hostname, description: 'host'
          end
        end
      end
    end
  end
end
