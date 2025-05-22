# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Controllers
        module Execute
          extend ActiveSupport::Concern

          included do
            skip_before_action :verify_authenticity_token

            # If accessing from outside this domain, nullify the session
            # This allows for outside API access while preventing CSRF attacks,
            # but you'll have to authenticate your user separately
            # protect_from_forgery with: :null_session

            def groovestack_graphql_schema
              raise 'groovestack_graphql_schema is not set' if groovestack_graphql_schema.blank?
            end

            def execute
              result = groovestack_graphql_schema.execute(
                query,
                variables: variables,
                context: execute_context,
                operation_name: operation_name
              )

              process_result_errors(result['errors'])

              render json: result
            rescue StandardError => e
              ::Groovestack::Base.notify_error(e.class.name, e.message)

              raise e unless Rails.env.development?

              handle_error_in_development(e)
            end
          end

          private

          def execute_context
            return {} unless defined?(context)

            context
          end

          def process_result_errors(errors)
            # NOTE: This is a custom Bugsnag notify call for requests that
            # have handled errors (validation, invariant, top-level, handled)
            return if errors.blank?

            errors.each do |error|
              msg = error['message'] || error

              ::Groovestack::Base.notify_error(error.class.name, msg)
            end
          end
        end
      end
    end
  end
end
