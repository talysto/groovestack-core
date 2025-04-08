# frozen_string_literal: true

module Groovestack
  module Config
    module GraphQL
      module App
        module Queries
          extend ActiveSupport::Concern

          included do
            field :AppConfig, ::GraphQL::Types::JSON, null: false # rubocop:disable GraphQL/FieldName
          end

          def AppConfig # rubocop:disable Naming/MethodName
            Groovestack::Config::App.generate_config
          end
        end
      end
    end
  end
end
