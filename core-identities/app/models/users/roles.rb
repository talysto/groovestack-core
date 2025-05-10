# frozen_string_literal: true

# rubocop:disable Lint/ConstantDefinitionInBlock

module Users
  module Roles
    extend ActiveSupport::Concern

    included do
      scope :with_roles, lambda { |roles|
        roles_array = Array(roles).map(&:to_s)
        where('roles ?| array[:roles]', roles: roles_array)
      }

      module Role
        ADMIN = 'admin'
        EXEC = 'exec'.freeze
        STAFF = 'staff'.freeze
      end

      ROLES = [
        Role::ADMIN,
        Role::EXEC,
        Role::STAFF
      ].freeze

      def add_roles(roles)
        self.roles |= roles
      end

      def add_role(role)
        add_roles([role])
      end

      def role?(role)
        roles.include? role.to_s
      end

      ROLES.each do |role|
        define_method("#{role}!") do
          add_role(role)
          save!
        end

        define_method("#{role}?") do
          role?(role)
        end

        scope :"#{role}", -> { with_roles(role) }
      end
    end
  end
end

# rubocop:enable Lint/ConstantDefinitionInBlock
