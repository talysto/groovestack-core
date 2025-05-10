# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Authorization
        class VisibleField < ::Groovestack::Base::GraphQL::Base::Field
          def visible?(context)
            return super unless @visibility_permission

            # visibility profile are the visibility levels the
            # current user is authorized for
            visibility_profile = context.schema.visibility_profile_for_context(context).map(&:to_sym)

            return super unless visibility_profile

            super && visibility_profile.include?(@visibility_permission.to_sym)
          end
        end
      end
    end
  end
end