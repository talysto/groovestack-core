module Core
  module Base
    module GraphQL
      module Types
        class BaseArgument < ::GraphQL::Schema::Argument
          def initialize(*args, camelize: false, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            super
          end
        end

        class BaseField < ::GraphQL::Schema::Field
          argument_class BaseArgument
          attr_accessor :authenticate

          def initialize(*args, authenticate: nil, null: false, camelize: false, **kwargs, &block)
            # Then, call super _without_ any args, where Ruby will take
            # _all_ the args originally passed to this method and pass it to the super method.
            @authenticate = authenticate
            super(*args, null: null, camelize: camelize, **kwargs, &block)
          end
        end

        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class AuthorizedField < BaseField
          attr_accessor :authenticate
  
          def initialize(*args, association: false, **kwargs, &block)
            kwargs[:resolver_method] = :resolve_association if association && defined?(Pundit) # ensure associations scopes are authorized
  
            super(*args, **kwargs, &block)
          end
  
          def resolve_association
            current_user = context[:current_user]
            class_const = name.to_s.classify
            policy = Pundit.policy!(current_user, class_const)
            policy::IndexScope.new(current_user, class_const).resolve
          end
  
          def authorized?(obj, args, ctx)
            authorized_fields = obj.authorized_fields_for_serialization(ctx[:current_user]) rescue []
  
            super && authorized_fields.include?(name.to_sym)
          end
        end
  
        class AuthorizedObject < BaseObject
          field_class AuthorizedField
        end

        class SubscriptionPayload < ::Core::Base::GraphQL::Types::BaseObject
          field :subscription, String, null: false
          field :event, ::GraphQL::Types::JSON, null: false
          field :subscription_args, ::GraphQL::Types::JSON, null: false
        end
      end
    end
  end
end