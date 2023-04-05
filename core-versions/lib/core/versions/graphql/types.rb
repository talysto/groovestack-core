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

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :changes, ::GraphQL::Types::JSON, null: true
          # field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false

          # relations
          field :resource_id, ID, null: true
          field :resource_type, String, null: true
          field :actor_id, ID, null: true
          field :actor_type, String, null: true

          field :timestamp, String, null: false

          def changes
            changes = []
            object.changeset.each do |attribute, values|
              next if attribute === 'updated_at'

              changes.push([attribute, [object.changeset[attribute][0], object.changeset[attribute][1]]])
            end

            return changes
          end

          def actor_id
            object[:whodunnit]
          end

          def actor_type
            'User'
          end

          def resource_id
            object[:item_id]
          end

          def resource_type
            object[:item_type]
          end

          def timestamp
            object[:created_at]
          end
        end

        class VersionListMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end
