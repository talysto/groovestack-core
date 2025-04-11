# frozen_string_literal: true

# TODO: add specs

module Groovestack
  module Base
    module GraphQL
      module Tracers
        # The AtmoicMultiplexTransaction module provides a mechanism to execute GraphQL multiplex queries
        # within a database transaction. If any of the queries in the multiplex is a mutation, the entire
        # multiplex is executed within a transaction. If an error occurs during the execution of a mutation,
        # the transaction is rolled back, and the errors are returned with null data.
        #
        # Methods:
        # - execute_multiplex(multiplex:): Executes the provided multiplex within a transaction if any of the
        #   queries is a mutation. If an error occurs during the execution of a mutation, the transaction is
        #   rolled back, and the errors are returned with null data.
        #

        # NOTE: This module assumes that the multiplex object responds to `queries` and each query
        # responds to `mutation?`.

        module AtomicMultiplexTransaction
          def execute_multiplex(multiplex:, &block)
            return yield unless contains_mutation?(multiplex)

            execute_with_transaction(&block)
          end

          private

          def contains_mutation?(multiplex)
            multiplex.queries.any?(&:mutation?)
          end

          def execute_with_transaction
            results = nil
            rollback = false

            begin
              ::ActiveRecord::Base.transaction do
                results = yield
                rollback = results_errors?(results)
                raise ::ActiveRecord::Rollback if rollback

                results
              end
            rescue ::ActiveRecord::Rollback
              rollback = true
            end

            rollback ? handle_rollback(results) : results
          end

          def results_errors?(results)
            results.any? do |result|
              result.is_a?(::GraphQL::Query::Result) && result.to_h['errors'].present?
            end
          end

          def handle_rollback(results)
            results.map do |result|
              ::GraphQL::Query::Result.new(
                query: result.query,
                values: result.to_h.merge('data' => nil)
              )
            end
          end
        end
      end
    end
  end
end
