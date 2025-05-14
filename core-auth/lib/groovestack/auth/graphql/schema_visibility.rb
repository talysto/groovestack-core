# frozen_string_literal: true

module Groovestack
  module Auth
    module GraphQL
      module SchemaVisibility
        extend ActiveSupport::Concern

        included do
          use ::GraphQL::Schema::Visibility

          # NOTE: currently, this is user role based
          # visibility_profiles enumerate the permissions each
          # role has access to

          @visibility_profiles = [
            { key: :anon,               permissions: [:public] },
            { key: :user,               permissions: %i[public basic] },
            { key: ::User::Role::STAFF, permissions: [:public, :basic, ::User::Role::STAFF] },
            { key: ::User::Role::EXEC,  permissions: [:public, :basic, ::User::Role::STAFF, ::User::Role::EXEC] },
            { key: ::User::Role::ADMIN,
              permissions: [:public, :basic, ::User::Role::STAFF, ::User::Role::EXEC, ::User::Role::ADMIN] }
          ].each_with_object({}) do |profile, acc|
            acc[profile[:key].to_sym] = profile[:permissions].map(&:to_sym)
          end.freeze

          class << self
            attr_reader :visibility_profiles

            def visibility_profile_for_context(context)
              return [] if context[:visibility_profile].blank?

              visibility_profiles[context[:visibility_profile].to_sym] || []
            end
          end
        end
      end
    end
  end
end
