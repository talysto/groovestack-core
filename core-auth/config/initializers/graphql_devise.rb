$CORE_AUTH_OVERRIDES_COMPLETE = false unless $CORE_AUTH_OVERRIDES_COMPLETE

ActiveSupport.on_load(:after_initialize) do
  unless $CORE_AUTH_OVERRIDES_COMPLETE     
    module DeviseTokenAuth::Concerns::ActiveRecordSupport
      extend ActiveSupport::Concern

      class_methods do
        # Override to remove provider from attrs b/c use identity model
        def dta_find_by(attrs = {})
          attrs.delete(:provider)
          attrs.delete('provider')
          find_by(attrs)
        end
      end
    end

    class User < ActiveRecord::Base
      # Override to remove provider from attrs b/c use identity model
      def self.dta_find_by(attrs = {})
        attrs.delete(:provider)
        attrs.delete('provider')
        find_by(attrs)
      end
    end

    User.include ::GraphqlDevise::Authenticatable

    GraphqlDevise::Mutations::Register.class_eval do
      private

      def build_resource(attrs)
        # NOTE remove provider from attrs b/c use identity model
        attrs.delete(:provider)
        resource_class.new(attrs)
      end
    end

    GraphqlDevise::Types::AuthenticatableType.class_eval do
      field :id, GraphQL::Types::ID, null: false
    end

    $CORE_AUTH_OVERRIDES_COMPLETE = true
  end
end