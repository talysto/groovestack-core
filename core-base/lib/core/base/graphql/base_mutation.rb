module Core
  module Base 
    module GraphQL
      class BaseMutation < ::GraphQL::Schema::Mutation
        argument_class ::Core::Base::GraphQL::Types::BaseArgument

        def resolve(**args)
          perform(**args)

        rescue => e
          Core::Base.log_error(self.class, e)

          raise e
        end

        def perform(**args)
          raise NotImplementedError
        end
      end
    end
  end
end