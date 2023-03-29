module Core 
  module Accounting
    module GraphQL
      module Types
        class BaseObject < ::GraphQL::Schema::Object
          field_class ::Core::Base::GraphQL::Types::BaseField
        end

        class BaseInputObject < ::GraphQL::Schema::InputObject
          argument_class ::Core::Base::GraphQL::Types::BaseArgument
        end

        class Line < BaseObject
          description 'A double entry line'

          # model reference:
          # https://github.com/envato/double_entry/blob/master/lib/double_entry/line.rb

          field :id, ID, null: false
          field :account, String, null: false 
          field :scope, String, null: false 
          field :code, String, null: false
          field :amount, ::GraphQL::Types::JSON, null: false # money object
          field :balance, ::GraphQL::Types::JSON, null: false # money object
          field :partner_account, String, null: false 
          field :partner_scope, String, null: true 
          field :detail_id, ID, null: true 
          field :detail_type, String, null: true
          field :metadata, ::GraphQL::Types::JSON, null: true

          field :partner, ::Core::Accounting::GraphQL::Types::Line, null: true

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false
        end

        class LineListMetadata < BaseObject
          field :count, Int, null: false
        end
      end
    end
  end
end