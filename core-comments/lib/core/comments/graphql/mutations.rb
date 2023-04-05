module Core
  module Comments
    module GraphQL
      module Mutations
        class BaseMutation < ::GraphQL::Schema::Mutation
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        module Comment
          class Create < BaseMutation
            argument :body, String, required: true
            argument :resource_id, ID, required: true
            argument :resource_type, String, required: true

            type ::Core::Comments::GraphQL::Types::Comment

            def resolve(**attrs)
              attrs[:author] = context[:current_user]
              ::Core::Comments::Comment.create!(attrs)
            end
          end

          class Delete < BaseMutation
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Types::Comment

            def resolve(id:)
              obj = ::Core::Comments::Comment.find(id)
              obj.destroy!
            end
          end

          class Update < BaseMutation
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
