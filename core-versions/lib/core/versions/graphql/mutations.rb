module Core
  module Versions
    module GraphQL
      module Mutations
        class BaseMutation < ::GraphQL::Schema::Mutation
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        module Version
          class Create < BaseMutation
            argument :body, String, required: true
            argument :resource_id, ID, required: true
            argument :resource_type, String, required: true
            argument :namespace, String, required: false

            type ::Core::Versions::GraphQL::Types::Version

            def resolve(**attrs)
              attrs[:author_id] = context[:current_user].id
              attrs[:author_type] = 'User' # TODO make author_type dynamic
              ::Core::Versions::Version.create!(attrs)
            end
          end

          class Delete < BaseMutation
            argument :id, ID, required: true

            type ::Core::Versions::GraphQL::Types::Version

            def resolve(id:)
              obj = ::Core::Versions::Version.find(id)
              obj.destroy!
            end
          end

          class Update < BaseMutation
            argument :id, ID, required: true
            argument :body, String, required: false

            type ::Core::Versions::GraphQL::Types::Version

            def resolve(id:, **attrs)
              obj = ::Core::Versions::Version.find(id)
              obj.update!(**attrs)
              obj
            end
          end
        end

        extend ActiveSupport::Concern

        included do
          field :createVersion, mutation: Core::Versions::GraphQL::Mutations::Version::Create
          field :deleteVersion, mutation: Core::Versions::GraphQL::Mutations::Version::Delete
          field :updateVersion, mutation: Core::Versions::GraphQL::Mutations::Version::Update
        end
      end
    end
  end
end
