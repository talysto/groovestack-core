# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength, Metrics/ModuleLength, Metrics/ParameterLists

module Groovestack
  module Base
    module GraphQL
      module Providers
        module ReactAdmin
          module Resource
            extend ActiveSupport::Concern

            class_methods do
              # TODO: make authorize default to true

              def react_admin_resource(entity,
                                       class_name: nil,
                                       graphql_path: nil,
                                       graphql_type: nil,
                                       graphql_filter: nil,
                                       authorize: false,
                                       visibility_permission: nil,
                                       policy: nil,
                                       camelize: ::Groovestack::Base.config.graphql.camelize,
                                       **args)
                graphql_namespace = graphql_path&.dup&.concat('::')
                entity_model_name = entity.to_s.classify
                entity_class = class_name || entity_model_name
                entity_type = resolve_entity_type(graphql_type, graphql_namespace, entity_model_name)
                entity_filter_type = resolve_filter_type(graphql_filter, graphql_namespace, entity_model_name)
                except = args.delete(:except) || []
                policy ||= "#{entity_class}Policy"
                base_scope = resolve_base_scope(entity_class)

                define_resolver_methods(entity, entity_model_name, authorize, policy, base_scope, except)
                define_graphql_fields(entity, entity_model_name, entity_type, entity_filter_type,
                                      visibility_permission, camelize, except)
              end

              private

              def resolve_entity_type(graphql_type, graphql_namespace, entity_model_name)
                type_path = graphql_type || "#{graphql_namespace}#{entity_model_name}::Type"
                type_path.constantize
              end

              def resolve_filter_type(graphql_filter, graphql_namespace, entity_model_name)
                filter_path = graphql_filter || "#{graphql_namespace}#{entity_model_name}::Filter"
                filter_path.constantize
              end

              def resolve_base_scope(entity_class)
                entity_class.constantize.unscoped
              rescue StandardError
                nil
              end

              def define_resolver_methods(entity, entity_model_name, authorize, policy, base_scope, except)
                unless except.include?(:find)
                  define_find_resolver(entity, entity_model_name, authorize, policy,
                                       base_scope)
                end
                define_collection_resolver(entity, authorize, policy, base_scope) unless except.include?(:collection)
                define_meta_resolver(entity, authorize, policy, base_scope) unless except.include?(:collection_meta)
              end

              def define_find_resolver(_entity, entity_model_name, authorize, policy, base_scope)
                define_method entity_model_name.to_sym do |id:|
                  scope = resolve_scope(authorize, policy, :ShowScope, base_scope)
                  scope.find id
                end
              end

              def define_collection_resolver(entity, authorize, policy, base_scope)
                define_method entity do |page: nil, per_page: nil, **attrs|
                  scope = resolve_scope(authorize, policy, :IndexScope, base_scope)
                  scope = send("#{entity}_scope", **attrs, base_scope: scope)
                  apply_pagination(scope, page, per_page)
                end
              end

              def define_meta_resolver(entity, authorize, policy, base_scope)
                define_method :"#{entity}_meta" do |_page: nil, _per_page: nil, **attrs|
                  scope = resolve_scope(authorize, policy, :IndexScope, base_scope)
                  { count: send("#{entity}_scope", **attrs, base_scope: scope).size }
                end
              end

              def define_graphql_fields(entity, entity_model_name, entity_type, entity_filter_type,
                                        visibility_permission, camelize, except)
                unless except.include?(:find)
                  define_find_field(entity, entity_model_name, entity_type,
                                    visibility_permission)
                end
                unless except.include?(:collection)
                  define_collection_field(entity, entity_type, entity_filter_type, visibility_permission,
                                          camelize)
                end
                return if except.include?(:collection_meta)

                define_meta_field(entity, entity_filter_type, visibility_permission,
                                  camelize)
              end

              def define_find_field(entity, entity_model_name, entity_type, visibility_permission)
                field entity_model_name.to_sym, entity_type,
                      null: true,
                      visibility_permission: visibility_permission,
                      resolver_method: entity_model_name.to_sym,
                      description: "Find #{entity}." do
                  argument :id, ::GraphQL::Types::ID, required: true, description: Documentation::Arguments.id
                end
              end

              def define_collection_field(entity, entity_type, entity_filter_type, visibility_permission, camelize)
                field :"all_#{entity.to_s.underscore}",
                      type: [entity_type],
                      null: false,
                      camelize: camelize,
                      visibility_permission: visibility_permission,
                      resolver_method: entity do
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

              def define_meta_field(entity, entity_filter_type, visibility_permission, camelize)
                field :"_all_#{entity.to_s.underscore}_meta",
                      type: ::Groovestack::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata,
                      camelize: camelize,
                      null: true,
                      visibility_permission: visibility_permission,
                      resolver_method: :"#{entity}_meta" do
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

            private

            def resolve_scope(authorize, policy, scope_class, base_scope)
              if authorize
                policy.constantize.const_get(scope_class).new(context[:current_user], base_scope).resolve
              else
                base_scope
              end
            end

            def apply_pagination(scope, page, per_page)
              return scope unless page.present? && scope.respond_to?(:offset)

              scope.offset(page * per_page).limit(per_page)
            end
          end
        end
      end
    end
  end
end

# rubocop:enable Metrics/BlockLength, Metrics/ModuleLength, Metrics/ParameterLists
