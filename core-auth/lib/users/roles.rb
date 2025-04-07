# frozen_string_literal: true

module Users
  module Roles
    extend ActiveSupport::Concern

    included do
      scope :with_roles, ->(roles) { jsonb_contains(:roles, roles) }
      scope :admins, -> { with_roles(:admin) }

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

      # TODO: rname role?
      def has_role?(role) # rubocop:disable Naming/PredicateName
        roles.include? role.to_s
      end
    end
  end
end
