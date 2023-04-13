module GraphQL::Schema::Member::BaseDSLMethods
  def default_graphql_name
    @default_graphql_name ||= begin
      raise ::GraphQL::RequiredImplementationMissingError, 'Anonymous class should declare a `graphql_name`' if name.nil?

      name.split("GraphQL").last.split("Types::").last.gsub("::", "")
    end
  end
end