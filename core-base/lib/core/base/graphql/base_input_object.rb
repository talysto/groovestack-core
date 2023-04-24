module Core 
  module Base 
    module GraphQL
      class BaseInputObject < ::GraphQL::Schema::InputObject
        argument_class ::Core::Base::GraphQL::Types::BaseArgument
      end
    end
  end
end