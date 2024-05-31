module Core
  module Base
    module ActiveRecord
      module Authorization
        module FieldsForSerialization 
          extend ActiveSupport::Concern
      
          # required for memoization during graphql serialization
          def authorized_fields_for_serialization(user)
            @authorized_fields_for_serialization ||= Pundit.policy!(user, self).permitted_attributes_for_show
            @authorized_fields_for_serialization
          end
        end
      end
    end
  end
end