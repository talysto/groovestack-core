module GraphQL::Schema::Member::BaseDSLMethods
  def default_graphql_name
    @default_graphql_name ||= begin
      raise ::GraphQL::RequiredImplementationMissingError, 'Anonymous class should declare a `graphql_name`' if name.nil?

      # ex name: "GraphQL::User::Type"
      # ex name: "GraphQL::Admin::User::Type"

      graphql_name = name.split("GraphQL").last.split("Types::").last.split("::Type").first.gsub("::", "")
      graphql_name.gsub("Admin", "") # assumption here that graphql schema def might have an admin namespace. TODO refactor
    end
  end
end