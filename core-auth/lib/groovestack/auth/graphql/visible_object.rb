module Groovestack
  module Auth
    module GraphQL
      class VisibleObject < ::Groovestack::Base::GraphQL::Base::Object
        field_class ::Groovestack::Auth::GraphQL::VisibleField

        def self.visible?(context)
          any_visible_fields = fields.values.any? { |field| field.visible?(context) }
    
          super && any_visible_fields
        end
      end
    end
  end
end
