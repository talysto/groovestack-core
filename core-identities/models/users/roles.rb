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
      scope :admins, -> { with_roles(Role::ADMIN) }

      module Role
        ADMIN = 'admin'
      end

      ROLES = [
        Role::ADMIN
      ].freeze

      def add_roles(roles)
        self.roles |= roles
      end

      def add_role(role)
        add_roles([role])
      end

      def admin!
        add_role(User::Role::ADMIN)
        save!
      end

      def admin?
        roles.include? User::Role::ADMIN
      end

      def role?(role)
        roles.include? role.to_s
      end
    end
  end
end

# rubocop:enable Lint/ConstantDefinitionInBlock
