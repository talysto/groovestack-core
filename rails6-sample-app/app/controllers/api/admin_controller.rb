module API
  class AdminController < APIController

    def execute
      variables = params[:variables]
      query = params[:query]
      operation_name = params[:operationName]

      result = AdminSchema.execute(query, variables: variables, context: context, operation_name: operation_name)

      render json: result

    rescue StandardError => e
      raise e unless Rails.env.development?
      handle_error_in_development e
    end
  end


  class Mutations < GraphQL::Schema::Object
    include Core::Jobs::GraphQL::Mutation
  end

  class Queries <  GraphQL::Schema::Object # Types::Base::Object
    include Core::Jobs::GraphQL::Query

    field :allJobs, JobType,

    # def resource
    # def filter_pagination
  end

  class AdminSchema < GraphQL::Schema
    mutation(Mutations)
    query(Queries)


    # Opt in to the new runtime (default in future graphql-ruby versions)
    use GraphQL::Execution::Interpreter
    use GraphQL::Analysis::AST

    # Add built-in connections for pagination
    use GraphQL::Pagination::Connections

    # Error Handling https://graphql-ruby.org/errors/error_handling.html
    rescue_from(ActiveRecord::RecordInvalid) do |err, obj, args, ctx, field|
      # Raise a graphql-friendly error with a custom message
      raise GraphQL::ExecutionError.new(err.message, extensions: { args: args })
    end

    rescue_from(ActiveRecord::RecordNotFound) do |err, obj, args, ctx, field|
      # Raise a graphql-friendly error with a custom message
      raise GraphQL::ExecutionError.new("#{field.type.unwrap.graphql_name} not found", extensions: { args: args })
    end
  end
end
