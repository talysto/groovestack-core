module Users
  module Roles
    extend ActiveSupport::Concern

    included do
      scope :with_roles, ->(roles) { jsonb_contains(:roles, roles) }
      scope :admins, -> { with_roles(:admin) }

      module Role
        ADMIN = 'admin'.freeze
      end

      ROLES = [
        Role::ADMIN,
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
    end
  end
end
