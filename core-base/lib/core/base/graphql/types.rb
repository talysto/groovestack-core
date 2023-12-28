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
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
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

        class SubscriptionPayload < ::Core::Base::GraphQL::Types::BaseObject
          field :subscription, String, null: false
          field :event, ::GraphQL::Types::JSON, null: false
          field :subscription_args, ::GraphQL::Types::JSON, null: false
        end

        class Currency < ::Core::Base::GraphQL::Types::BaseObject
          description 'A currency object'
  
          field :code, String, null: false, description: 'currency code', method: :iso_code
          field :symbol, String, null: false, description: 'currency symbol'
        end

        class Money < ::Core::Base::GraphQL::Types::BaseObject
          description 'A money object'
  
          field :amount, String, null: false, description: 'amount in decimal'
          field :currency, ::Core::Base::GraphQL::Types::Currency, null: false, description: 'currency metadata'
          field :formatted_amount, String, null: false, description: 'amount in decimal formatted with currency symbol', method: :format
  
          def amount
            object.amount.to_s
          end
        end

        # module Authorized 
        class AuthorizedBaseField < BaseField
          attr_accessor :authenticate
  
          def initialize(*args, association: false, **kwargs, &block)
            kwargs[:resolver_method] = :resolve_association if association && kwargs[:resolver_method].nil? && defined?(Pundit) # ensure associations scopes are authorized
  
            super(*args, **kwargs, &block)
            # puts "AuthorizedField for #{owner}: #{name} association: #{association} resolver_method #{resolver_method}"
            # puts "authorized_field #{name} association: #{association}"
          end
  
          def resolve_association
            puts "resolve_association #{name}"
            current_user = context[:current_user]
            class_const = name.to_s.classify
            policy = Pundit.policy!(current_user, class_const)
            scope_class = @return_type_expr.is_a?(Array) ? policy::IndexScope : policy::ShowScope
            puts "scope_class #{scope_class}"
            scope_class.new(current_user, class_const).resolve
          end
  
          def authorized?(obj, args, ctx)
            authorized_fields = obj.authorized_fields_for_serialization(ctx[:current_user]) rescue []
            
            super && authorized_fields.include?(name.to_sym)
          end
        end

        class AuthorizedBaseObject < BaseObject
          field_class ::Core::Base::GraphQL::Types::AuthorizedBaseField

          def initialize(object, context)
            @object = object
            @context = context
          end
        end
        # end
      end
    end
  end
end