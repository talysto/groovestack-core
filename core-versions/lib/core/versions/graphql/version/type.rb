# frozen_string_literal: true

module Core
  module Versions
    module GraphQL
      module Version
        class Type < ::Core::Base::GraphQL::Types::BaseObject
          description 'A version'

          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.id

          field :changes, ::GraphQL::Types::JSON, null: true, description: 'list of changes in the version'
          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.created_at
          # field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false

          # relations
          field :actor_id, ID, null: true, hash_key: :whodunnit, description: 'id of actor relation'
          field :actor_type, String, null: true, description: 'class of actor relation'
          field :resource_id, ID, null: true, hash_key: :item_id, description: 'id of resource relation'
          field :resource_type, String, null: true, hash_key: :item_type, description: 'class of resource relation'

          field :timestamp, String, null: false, hash_key: :created_at, description: ::Core::Base::GraphQL::Documentation::Fields.created_at

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
      end
    end
  end
end
