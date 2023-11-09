# frozen_string_literal: true

module Core
  module Config
    module GraphQL
      module App
        module Queries
          extend ActiveSupport::Concern

          included do
            field :AppConfig, ::GraphQL::Types::JSON, null: false
          end

          def AppConfig
            Core::Config::App.generate_config
          end
        end
      end
    end
  end
end
