module Core
  module Comments
    module GraphQL
      module Types
        module Commentable 
          extend ActiveSupport::Concern

          included do
            field :type, String, null: true, resolver_method: :object_type

            def object_type
              object.class.to_s if object.respond_to?(:class)
            end
          end
        end

        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class BaseInputObject < ::GraphQL::Schema::InputObject
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        class Comment < BaseObject
          description 'A comment'

          field :id, ID, null: false

          field :body, String, null: false
          field :namespace, String, null: true

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false

          # relations
          field :resource_id, ID, null: false
          field :resource_type, String, null: false
          field :author_id, ID, null: false
          field :author_type, String, null: false
        end

        class CommentListMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end
