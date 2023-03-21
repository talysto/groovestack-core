module Core
  module Comments
    module GraphQL
      module Mutations
        module Comment
          class Create < ::GraphQL::Schema::Mutation
            argument :body, String, required: true
            argument :resource_id, ID, required: true
            argument :resource_type, String, required: true
            argument :namespace, String, required: false

            type ::Core::Comments::GraphQL::Types::Comment

            def resolve(**attrs)
              attrs[:author_id] = context[:current_user].id
              attrs[:author_type] = 'User' # TODO make author_type dynamic
              ::Core::Comments::Comment.create!(attrs)
            end
          end

          class Delete < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Types::Comment

            def resolve(id:)
              obj = ::Core::Comments::Comment.find(id)
              obj.destroy!
            end
          end

          class Update < ::GraphQL::Schema::Mutation
            argument :id, ID, required: true
            argument :body, String, required: false

            type ::Core::Comments::GraphQL::Types::Comment

            def resolve(id:, **attrs)
              obj = ::Core::Comments::Comment.find(id)
              obj.update!(**attrs)
              obj
            end
          end
        end

        extend ActiveSupport::Concern

        included do
          field :createComment, mutation: Core::Comments::GraphQL::Mutations::Comment::Create
          field :deleteComment, mutation: Core::Comments::GraphQL::Mutations::Comment::Delete
          field :updateComment, mutation: Core::Comments::GraphQL::Mutations::Comment::Update
        end
      end
    end
  end
end
