ActiveSupport.on_load(:after_initialize) do
  if defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    Core::Config::App.dynamic_config << { 
      key: :oauth_providers, 
      build: Proc.new { 
        { 
          available: Groovestack::Auth.available_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map { |p| p.as_json[:k] }, 
          enabled: Groovestack::Auth.enabled_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map { |p| p.as_json([:k, :path]) },
          configured: Groovestack::Auth.configured_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map { |p| p.as_json([:k, :provider, :path]) }
        } 
      } 
    }

    Core::Config::App.dynamic_config << {
      key: :auth_providers,
      build: Proc.new {
        {
          available: Groovestack::Auth.available_providers.map { |p| p.as_json([:k, :provider]) },
          enabled: Groovestack::Auth.enabled_providers.map { |p| p.as_json([:k, :provider, :path]) },
          configured: Groovestack::Auth.configured_providers.map { |p| p.as_json([:k, :provider, :path]) }
        }
      }
    }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end