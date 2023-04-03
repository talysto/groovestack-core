module Core
  module Versions
    module GraphQL
      module Types
        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class BaseInputObject < ::GraphQL::Schema::InputObject
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        class Version < BaseObject
          description 'A version'

          field :id, ID, null: false

          field :body, String, null: false
          field :namespace, String, null: true

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false

          # relations
          field :resource_id, ID, null: false
          field :resource_type, String, null: false
          field :actor_id, ID, null: false
          field :actor_type, String, null: false

          def actor_id
            object[:whodunnit]
          end

          def actor_type
            "User"
          end

          def resource_id
            object[:item_id]
          end

          def resource_type
            object[:item_type]
          end
        end

        class VersionListMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end
