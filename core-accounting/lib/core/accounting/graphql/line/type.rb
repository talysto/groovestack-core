# frozen_string_literal: true

module Core
  module Accounting
    module GraphQL
      module Line
        class Type < ::Core::Base::GraphQL::BaseObject
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
          field :partner_id, ID, null: false, description: ''
          field :partner_scope, String, null: true, description: ''
          field :scope, String, null: false, description: ''

          field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.created_at
          field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: ::Core::Base::GraphQL::Documentation::Fields.updated_at
        end
      end
    end
  end
end
