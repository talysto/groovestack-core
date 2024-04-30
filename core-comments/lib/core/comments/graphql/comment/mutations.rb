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

            def current_user
              context[:current_user]
            end

            def perform(**attrs)
              attrs[:author_id] = current_user.id
              attrs[:author_type] = current_user.respond_to?(:class) ? current_user.class.to_s : nil # the nil case should throw an error

              ::Core::Comments::Comment.create!(attrs)
            end
          end

          class Delete < ::Core::Base::GraphQL::BaseMutation
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Comment::Type

            def perform(id:)
              obj = ::Core::Comments::Comment.find(id)
              obj.destroy!
            end
          end

          class Update < ::Core::Base::GraphQL::BaseMutation
            argument :body, String, required: false
            argument :id, ID, required: true

            type ::Core::Comments::GraphQL::Comment::Type

            def perform(id:, **attrs)
              obj = ::Core::Comments::Comment.find(id)
              obj.update!(**attrs)
              obj
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
end
