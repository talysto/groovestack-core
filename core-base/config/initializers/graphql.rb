# frozen_string_literal: true

# TODO: add specs

module GraphQL
  class Schema
    class Member
      module BaseDSLMethods
        def default_graphql_name
          @default_graphql_name ||= begin
            if name.nil?
              raise ::GraphQL::RequiredImplementationMissingError,
                    'Anonymous class should declare a `graphql_name`'
            end

            # ex name: "GraphQL::User::Type"
            # ex name: "GraphQL::Admin::User::Type"

            graphql_name = name.split('GraphQL').last.split('Types::').last.split('::Type').first.gsub('::', '')
            # TODO: refactor
            # assumption here that graphql schema has an admin namespace.
            graphql_name.gsub('Admin', '')
          end
        end
      end
    end
  end
end
