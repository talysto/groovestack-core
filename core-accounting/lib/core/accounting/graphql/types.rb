# frozen_string_literal: true

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

          field :account, String, null: false, description: ''
          field :amount, ::GraphQL::Types::JSON, null: false, description: '' # money object
          field :balance, ::GraphQL::Types::JSON, null: false, description: '' # money object
          field :code, String, null: false, description: ''
          field :detail_id, ID, null: true, description: 'id of detail relation'
          field :detail_type, String, null: true, description: 'class of detail relation'
          field :id, ID, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.id
          field :metadata, ::GraphQL::Types::JSON, null: true, description: 'metadata of record'
          field :partner_account, String, null: false, description: ''
          field :partner_scope, String, null: true, description: ''
          field :scope, String, null: false, description: ''

          field :partner, ::Core::Accounting::GraphQL::Types::Line, null: true, description: ''

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.created_at
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.updated_at
        end

        class LineListMetadata < BaseObject
          field :count, Int, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.relation_count
        end
      end
    end
  end
end
