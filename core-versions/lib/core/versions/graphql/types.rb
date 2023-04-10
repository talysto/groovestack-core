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
              next if attribute == 'updated_at'
              next if ::Core::Versions::Version::NONSERIALIZED_ATTRIBUTE_STRINGS.any? { |string|
                        attribute.include?(string)
                      }

              if ::Core::Versions::Version::MASKED_ATTRIBUTE_STRINGS.any? { |string| attribute.include?(string) }
                changes.push([attribute, ['*****', '*****']])
              else
                changes.push([attribute, [values[0], values[1]]])
              end
            end

            changes
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
