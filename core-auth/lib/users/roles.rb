# NOTE: include this in the User model to add roles to the user

# example extensibility of roles

# module Users
#   module Roles
#     module Role
#       EXEC = 'exec'.freeze
#       STAFF = 'staff'.freeze
#     end

#     ROLES = [
#       Role::ADMIN,
#       Role::EXEC,
#       Role::STAFF
#     ].freeze
#   end
# end

module Users
  module Roles
    module Role
      ADMIN = 'admin'.freeze
    end

    DEFAULT_ROLES = [
      Role::ADMIN,
    ].freeze

    extend ActiveSupport::Concern

    included do
      scope :with_roles, ->(roles) { jsonb_contains(:roles, roles) }

      (defined?(ROLES) ? ROLES : DEFAULT_ROLES).each do |role|
        define_method("#{role}?") do
          roles.include?(role)
        end

        define_method("#{role}!") do
          add_role(role)
          save!
        end

        scope role.pluralize.to_sym, -> { with_roles([role]) }
      end

      def add_roles(roles)
        self.roles |= roles
      end

      def add_role(role)
        add_roles([role])
      end

      def has_role?(role)
        roles.include? role.to_s
      end
    end
  end
end
