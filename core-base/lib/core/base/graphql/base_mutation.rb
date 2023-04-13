module Core
  module Base 
    module GraphQL
      class BaseMutation < ::GraphQL::Schema::Mutation
        argument_class ::Core::Base::GraphQL::Types::BaseArgument
      end
    end
  end
end