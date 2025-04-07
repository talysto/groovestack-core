# frozen_string_literal: true

ActiveSupport.on_load(:after_initialize) do
  if defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: proc { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: proc { User::ROLES } }

    Core::Config::App.dynamic_config << {
      key: :oauth_providers,
      build: proc do
        {
          available: Groovestack::Auth.available_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map do |p|
            p.as_json[:k]
          end,
          enabled: Groovestack::Auth.enabled_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map do |p|
            p.as_json(%i[k path])
          end,
          configured: Groovestack::Auth.configured_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map do |p|
            p.as_json(%i[k provider path])
          end
        }
      end
    }

    Core::Config::App.dynamic_config << {
      key: :auth_providers,
      build: proc do
        {
          available: Groovestack::Auth.available_providers.map { |p| p.as_json(%i[k provider]) },
          enabled: Groovestack::Auth.enabled_providers.map { |p| p.as_json(%i[k provider path]) },
          configured: Groovestack::Auth.configured_providers.map { |p| p.as_json(%i[k provider path]) }
        }
      end
    }

    # make AppConfig query public
    ::Types::QueryType.fields['AppConfig'].instance_variable_set(:@authenticate, false)
  end
end
