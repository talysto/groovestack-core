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
              raise 'groovestack_graphql_schema is not set' unless groovestack_graphql_schema.present?
            end

            def execute
              result =  groovestack_graphql_schema.execute(
                query, 
                variables: variables, 
                context: defined?(context) ? context : {}, 
                operation_name: operation_name
              )

              if (errors = result.dig('errors')) && errors.any?
                # NOTE: This is a custom Bugsnag notify call for requests that
                # have handled errors (validation, invariant, top-level, handled)
                errors.each do |error|
                  msg = error.dig('message') || error

                  ::Groovestack::Base.notify_error(error.class.name, msg)
                end
              end
              
              render json: result
            rescue StandardError => e
              raise e unless Rails.env.development?

              # handle_error_in_development doesn't allow
              # error to get to bugsnag in development
              ::Groovestack::Base.notify_error(e.class.name, e.message)

              handle_error_in_development(e)
            end
          end
        end
      end
    end
  end
end