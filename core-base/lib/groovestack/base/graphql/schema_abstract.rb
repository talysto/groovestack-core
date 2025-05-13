module Groovestack
  module Base
    module GraphQL
      class SchemaAbstract < ::GraphQL::Schema
        # NOTE: This is intended to be a base class for all GraphQL schemas in the Groovestack ecosystem.
        # It is not intended to be used directly.
        #
        # To create a new GraphQL schema, subclass this class and specify:
        # - query(::Types::QueryType) (required)
        # - mutation(::Types::MutationType) (optional)
        # - subscription(::Types::SubscriptionType) (optional)
        #
        # Example:
        #
        # class MySchema < Groovestack::Base::GraphQL::SchemaAbstract
        #   query(::Types::QueryType)
        #   mutation(::Types::MutationType)
        #   subscription(::Types::SubscriptionType)

        use ::GraphQL::Subscriptions::ActionCableSubscriptions
        
        # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
        use ::GraphQL::Dataloader

        # Stop validating when it encounters this many errors:
        validate_max_errors(100)
        
        # Error Handling https://graphql-ruby.org/errors/error_handling.html
        rescue_from(
          ::ActiveRecord::RecordInvalid, 
          ::ActiveRecord::RecordNotDestroyed,
          # AASM::InvalidTransition
        ) do |err, _obj, args, _ctx, _field|
          # Raise a graphql-friendly error with a custom message
          raise ::GraphQL::ExecutionError.new(err.message, extensions: { args: })
        end

        rescue_from(::ActiveRecord::RecordNotFound) do |_err, _obj, args, _ctx, field|
          # Raise a graphql-friendly error with a custom message
          raise ::GraphQL::ExecutionError.new("#{field.type.unwrap.graphql_name} not found", extensions: { args: })
        end

        rescue_from(::ActiveRecord::RecordNotUnique) do |_err, _obj, args, _ctx, field|
          # Raise a graphql-friendly error with a custom message
          raise ::GraphQL::ExecutionError.new("#{field.type.unwrap.graphql_name} not unique", extensions: { args: })
        end

        # GraphQL-Ruby calls this when something goes wrong while running a query:
        def self.type_error(err, context)
          # if err.is_a?(GraphQL::InvalidNullError)
          #   # report to your bug tracker here
          #   return nil
          # end
          super
        end

        # Union and Interface Resolution
        def self.resolve_type(abstract_type, obj, ctx)
          # to return the correct GraphQL object type for `obj`
          raise(::GraphQL::RequiredImplementationMissingError)
        end

        # Relay-style Object Identification:

        # Return a string UUID for `object`
        def self.id_from_object(object, type_definition, query_ctx)
          # For example, use Rails' GlobalID library (https://github.com/rails/globalid):
          object.to_gid_param
        end

        # Given a string UUID, find the object
        def self.object_from_id(global_id, query_ctx)
          # For example, use Rails' GlobalID library (https://github.com/rails/globalid):
          ::GlobalID.find(global_id)
        end
      end
    end
  end
end