module Core
  module GraphQL
    module ResourceProviders
      module ReactAdmin
        def self.resource(entity, **args)
          entity_core_namespace = entity.to_s.camelize
          entity_model_name = entity.to_s.classify
          entity_class = "Core::#{entity_core_namespace}::#{entity_model_name}"
          entity_type = "Core::#{entity_core_namespace}::GraphQL::Types::#{entity_model_name}".constantize
          entity_filter_type = "Core::#{entity_core_namespace}::GraphQL::Types::Filters::#{entity_model_name}Filter".constantize

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
              scope = send("#{entity}_scope", attrs)
              scope = scope.page(page + 1).per(per_page) if page.present?
              scope
            end
          end

          # resolver_method for Collection meta

          unless except.include?(:collection_meta)
            define_method "#{entity}_meta".to_sym do |page: nil, per_page: nil, **attrs| # rubocop:disable Lint/UnusedBlockArgument
              { count: send("#{entity}_scope", attrs).count }
            end
          end

          # Record

          unless except.include?(:find)
            field entity_model_name.to_sym, entity_type, null: true, resolver_method: entity_model_name.to_sym, description: "Find #{entity_class}." do
              argument :id, ::GraphQL::Types::ID, required: true
            end
          end

          # Collection
          
          unless except.include?(:collection)
            field "all#{entity.to_s.camelize}".to_sym, [entity_type], null: false, resolver_method: entity do
              argument :page, ::GraphQL::Types::Int, required: false
              argument :per_page, ::GraphQL::Types::Int, required: false
              argument :sort_field, ::GraphQL::Types::String, required: false
              argument :sort_order, ::GraphQL::Types::String, required: false
              argument :filter, entity_filter_type, required: false
            end
          end

          # Collection meta

          unless except.include?(:collection_meta)
            field "_all#{entity.to_s.camelize}Meta".to_sym, [Types::ListMetadata], camelize: false, null: true, resolver_method: "#{entity}_meta".to_sym do
              argument :page, ::GraphQL::Types::Int, required: false
              argument :per_page, ::GraphQL::Types::Int, required: false
              argument :sort_field, ::GraphQL::Types::String, required: false
              argument :sort_order, ::GraphQL::Types::String, required: false
              argument :filter, entity_filter_type, required: false
            end
          end
        end
      end
    end
  end
end
