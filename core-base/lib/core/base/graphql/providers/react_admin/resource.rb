# frozen_string_literal: true
module Core
  module Base
    module GraphQL
      module Providers
        module ReactAdmin
          module Resource
            extend ActiveSupport::Concern

            class_methods do
              # TODO make authorize default to true

              def react_admin_resource(entity, 
                class_name: nil,
                graphql_path: nil,
                graphql_type: nil,
                graphql_filter: nil,
                authorize: false,
                visibility_permission: nil,
                policy: nil,
                **args
              )
                # NOTE class_name is only required if a custom _base_scope is not defined
                # NOTE graphql_path is only required to override the default graphql path

                graphql_namespace = graphql_path&.dup&.concat("::")
                entity_model_name = entity.to_s.classify
                entity_class = class_name || entity_model_name
                entity_type = (graphql_type || "#{graphql_namespace}#{entity_model_name}::Type").constantize
                entity_filter_type = (graphql_filter || "#{graphql_namespace}#{entity_model_name}::Filter").constantize
                except = args.delete(:except) || []
                policy = policy || "#{entity_class}Policy"
                base_scope = entity_class.constantize.unscoped rescue nil # nil is for the virtual classes (i.e. JobReport)

                # resolver_method for Record

                unless except.include?(:find)
                  define_method entity_model_name.to_sym do |id:|
                    scope = authorize ? policy.constantize::ShowScope.new(context[:current_user], base_scope).resolve : base_scope
                    scope.find id
                  end
                end

                # resolver_method for Collection

                unless except.include?(:collection)
                  define_method entity do |page: nil, per_page: nil, **attrs|
                    scope = authorize ? policy.constantize::IndexScope.new(context[:current_user], base_scope).resolve : base_scope
                    scope = send("#{entity}_scope", **attrs.merge(base_scope: scope))
                    scope = scope.offset(page*per_page).limit(per_page) if page.present? && scope.respond_to?(:offset)
                    scope
                  end
                end

                # resolver_method for Collection meta

                unless except.include?(:collection_meta)
                  define_method "#{entity}_meta".to_sym do |page: nil, per_page: nil, **attrs| # rubocop:disable Lint/UnusedBlockArgument
                    scope = authorize ? policy.constantize::IndexScope.new(context[:current_user], base_scope).resolve : base_scope
                    { count: send("#{entity}_scope", **attrs.merge(base_scope: scope)).size }
                  end
                end

                # Record

                unless except.include?(:find)
                  field entity_model_name.to_sym, entity_type, null: true, visibility_permission: visibility_permission, resolver_method: entity_model_name.to_sym,
                                                               description: "Find #{entity_class}." do
                    argument :id, ::GraphQL::Types::ID, required: true, description: Documentation::Arguments.id
                  end
                end

                # Collection

                unless except.include?(:collection)
                  field "all_#{entity.to_s.underscore}".to_sym, type: [entity_type], null: false, camelize: false, visibility_permission: visibility_permission, resolver_method: entity do
                    argument :page, ::GraphQL::Types::Int, required: false, description: Documentation::Arguments.page
                    argument :per_page, ::GraphQL::Types::Int, required: false,
                                                               description: Documentation::Arguments.per_page
                    argument :sort_field, ::GraphQL::Types::String, required: false,
                                                                    description: Documentation::Arguments.sort_field
                    argument :sort_order, ::GraphQL::Types::String, required: false,
                                                                    description: Documentation::Arguments.sort_order
                    argument :filter, entity_filter_type, required: false, description: Documentation::Arguments.filter
                  end
                end

                # Collection meta

                return if except.include?(:collection_meta)

                field "_all_#{entity.to_s.underscore}_meta".to_sym,
                      type: ::Core::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata,
                      camelize: false, null: true, visibility_permission: visibility_permission, resolver_method: "#{entity}_meta".to_sym do
                  argument :page, ::GraphQL::Types::Int, required: false, description: Documentation::Arguments.page
                  argument :per_page, ::GraphQL::Types::Int, required: false,
                                                             description: Documentation::Arguments.per_page
                  argument :sort_field, ::GraphQL::Types::String, required: false,
                                                                  description: Documentation::Arguments.sort_field
                  argument :sort_order, ::GraphQL::Types::String, required: false,
                                                                  description: Documentation::Arguments.sort_order
                  argument :filter, entity_filter_type, required: false, description: Documentation::Arguments.filter
                end
              end
            end
          end
        end
      end
    end
  end
end
