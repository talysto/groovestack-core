# frozen_string_literal: true

module Core
  module Comments
    module GraphQL
      module Comment
        module Mutations
          class Create < ::Core::Base::GraphQL::BaseMutation
            argument :body, String, required: true
            argument :resource_id, ID, required: true
            argument :resource_type, String, required: true

            type ::Core::Comments::GraphQL::Comment::Type

            def resolve(**attrs)
              attrs[:author_id] = context[:current_user].id
              attrs[:author_type] = 'User' # TODO: make author_type dynamic

              ::Core::Comments::Comment.create!(attrs)
            end
          end

          class Delete < ::Core::Base::GraphQL::BaseMutation
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Comment::Type

            def resolve(id:)
              obj = ::Core::Comments::Comment.find(id)
              obj.destroy!
            end
          end

          class Update < ::Core::Base::GraphQL::BaseMutation
            argument :body, String, required: false
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Comment::Type

            def resolve(id:, **attrs)
              obj = ::Core::Comments::Comment.find(id)
              obj.update!(**attrs)
              obj
            end
          end
        end

        extend ActiveSupport::Concern

        included do
          field :create_comment, mutation: Core::Comments::GraphQL::Comment::Mutations::Create
          field :delete_comment, mutation: Core::Comments::GraphQL::Comment::Mutations::Delete
          field :update_comment, mutation: Core::Comments::GraphQL::Comment::Mutations::Update
        end
      end
    end
  end
end
