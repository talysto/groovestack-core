# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Types
        module TypeResolver
          extend ActiveSupport::Concern

          included do
            field :type, String, null: true, resolver_method: :object_type

            def object_type
              object.class.to_s if object.respond_to?(:class)
            end
          end
        end
      end
    end
  end
end
