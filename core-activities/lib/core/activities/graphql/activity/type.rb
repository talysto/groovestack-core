module Core
  module Activities
    module GraphQL
      module Activity
        class Type < ::Core::Base::GraphQL::Types::BaseObject
          description 'An activity'

          field :actor_id, ID, null: true, description: 'actor id'
          field :actor_type, String, null: true, description: 'actor type'
          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'created at'
          field :id, ID, null: false, description: 'id'
          field :meta, ::GraphQL::Types::JSON, null: true, description: 'meta'
          field :note, String, null: true, description: 'note'
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'updated at'
          # DLR: added method_conflict_warning: false
          field :object_id, ID, null: true, description: 'object id', method_conflict_warning: false
          field :object_type, String, null: true, description: 'object type'
          # NOTE: this will cause n + 1 queries
          field :summary, String, null: true, description: 'summary'
          field :target_id, ID, null: true, description: 'target id'
          field :target_type, String, null: true, description: 'target type'
          field :type, String, null: true, description: 'type'
        end
      end
    end
  end
end
