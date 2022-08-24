module Core
  module Jobs
    module GraphQL
      module Mutations
        class BaseMutation < GraphQL::Schema::Mutation
          null false
          # argument_class Types::Base::Argument
          # field_class Types::Base::Field
          # input_object_class Types::Base::InputObject
          # object_class Types::Base::Object
        end
      end
    end
  end
end
