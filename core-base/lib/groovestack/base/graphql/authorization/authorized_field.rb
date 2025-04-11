# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Authorization
        class AuthorizedField < ::Groovestack::Base::GraphQL::Base::Field
          def authorized?(obj, args, ctx)
            authorized_fields = begin
              obj.authorized_fields_for_serialization(ctx[:current_user])
            rescue StandardError
              []
            end

            super && authorized_fields.include?(name.to_sym)
          end
        end
      end
    end
  end
end
