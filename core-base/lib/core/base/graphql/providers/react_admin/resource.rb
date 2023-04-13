# frozen_string_literal: true

module Core
  module Base
    module GraphQL
      module Providers
        module ReactAdmin
          module Resource
            extend ActiveSupport::Concern

            class_methods do              
              def react_admin_resource(entity, class_name: nil, graphql_path: nil, graphql_type: nil, graphql_filter: nil, **args)
                # NOTE class_name is only required if a custom _base_scope is not defined
                # NOTE graphql_path is only required to override the default graphql path

                graphql_namespace = graphql_path&.dup&.concat("::")
                entity_model_name = entity.to_s.classify
                entity_class = class_name || entity_model_name
                entity_type = (graphql_type || "#{graphql_namespace}#{entity_model_name}::Type").constantize
                entity_filter_type = (graphql_filter || "#{graphql_namespace}#{entity_model_name}::Filter").constantize
                except = args.delete(:except) || []

                # resolver_method for Record

                unless except.include?(:find)
                  define_method entity_model_name.to_sym do |id:|
                    scope = begin
                      send("#{entity}_base_scope")
                    rescue StandardError # => e
                      entity_class.constantize
                    end

                    scope.find id
                  end
                end

                # resolver_method for Collection

                unless except.include?(:collection)
                  define_method entity do |page: nil, per_page: nil, **attrs|
                    scope = send("#{entity}_scope", **attrs)
                    scope = scope.page(page + 1).per(per_page) if page.present? && scope.respond_to?(:page)
                    scope
                  end
                end

                # resolver_method for Collection meta

                unless except.include?(:collection_meta)
                  define_method "#{entity}_meta".to_sym do |page: nil, per_page: nil, **attrs| # rubocop:disable Lint/UnusedBlockArgument
                    { count: send("#{entity}_scope", **attrs).size }
                  end
                end

                # Record

                unless except.include?(:find)
                  field entity_model_name.to_sym, entity_type, null: true, resolver_method: entity_model_name.to_sym,
                                                               description: "Find #{entity_class}." do
                    argument :id, ::GraphQL::Types::ID, required: true, description: Documentation::Arguments.id
                  end
                end

                # Collection

                unless except.include?(:collection)
                  field "all#{entity.to_s.camelize}".to_sym, type: [entity_type], null: false,
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

                # Collection meta

                return if except.include?(:collection_meta)

                field "_all#{entity.to_s.camelize}Meta".to_sym,
                      type: ::Core::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata,
                      camelize: false, null: true, resolver_method: "#{entity}_meta".to_sym do
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
