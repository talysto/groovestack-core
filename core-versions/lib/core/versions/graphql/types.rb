# frozen_string_literal: true

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

          field :changes, ::GraphQL::Types::JSON, null: true
          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          # field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false

          # relations
          field :actor_id, ID, null: true, hash_key: :whodunnit
          field :actor_type, String, null: true
          field :resource_id, ID, null: true, hash_key: :item_id
          field :resource_type, String, null: true, hash_key: :item_type

          field :timestamp, String, null: false, hash_key: :created_at

          def changes
            changes = []
            object.changeset.each do |attribute, values|
              next if attribute == 'updated_at'
              next if ::Core::Versions::Version::NONSERIALIZED_ATTRIBUTE_STRINGS.any? do |string|
                        attribute.include?(string)
                      end

              if ::Core::Versions::Version::MASKED_ATTRIBUTE_STRINGS.any? { |string| attribute.include?(string) }
                changes.push([attribute, ['*****', '*****']])
              else
                changes.push([attribute, [values[0], values[1]]])
              end
            end

            changes
          end

          def actor_type
            'User'
          end
        end

        class VersionListMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end
