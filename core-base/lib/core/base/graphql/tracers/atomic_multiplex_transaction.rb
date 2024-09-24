module Core
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
        
        # Note:
        # - This module assumes that the multiplex object responds to `queries` and each query responds to
        #   `mutation?`.

        module AtomicMultiplexTransaction
          def execute_multiplex(multiplex:)
            is_mutation = multiplex.queries.any? { |query| query.mutation? }

            return yield unless is_mutation

            results = nil
            rollback = false

            begin
              ::ActiveRecord::Base.transaction do
                results = yield

                rollback = results.any? { |result| result.is_a?(::GraphQL::Query::Result) && result.to_h['errors'].present? }

                raise ::ActiveRecord::Rollback if rollback

                results
              end
            rescue ::ActiveRecord::Rollback
              rollback = true
            end
            
            return results unless rollback

            # IF rollback, extract errors and return null for data

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