module Core 
  module Base 
    module GraphQL
      class BaseObject < ::GraphQL::Schema::Object
        field_class ::Core::Base::GraphQL::Types::BaseField
      end
    end
  end
end