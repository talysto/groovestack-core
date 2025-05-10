# frozen_string_literal: true

ActiveSupport.on_load(:after_initialize) do
  if defined?(Groovestack::Config)
    Groovestack::Config::App.dynamic_config << { key: :has_admins, build: proc { User.admin.count.positive? } }
    Groovestack::Config::App.dynamic_config << { key: :user_roles, build: proc { User::ROLES } }
  end
end
