ActiveSupport.on_load(:after_initialize) do
  if defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    Core::Config::App.dynamic_config << { 
      key: :oauth_providers, 
      build: Proc.new { 
        { 
          available: Core::Auth.available_providers(ancestor: Core::Auth::Providers::OmniAuth).map { |p| p.as_json[:k] }, 
          enabled: Core::Auth.enabled_providers(ancestor: Core::Auth::Providers::OmniAuth).map { |p| p.as_json([:k, :path]) },
          configured: Core::Auth.configured_providers(ancestor: Core::Auth::Providers::OmniAuth).map { |p| p.as_json([:k, :provider, :path]) }
        } 
      } 
    }

    Core::Config::App.dynamic_config << {
      key: :auth_providers,
      build: Proc.new {
        {
          available: Core::Auth.available_providers.map { |p| p.as_json([:k, :provider]) },
          enabled: Core::Auth.enabled_providers.map { |p| p.as_json([:k, :provider, :path]) },
          configured: Core::Auth.configured_providers.map { |p| p.as_json([:k, :provider, :path]) }
        }
      }
    }
  end
end