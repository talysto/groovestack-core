ActiveSupport.on_load(:after_initialize) do
  if defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    # if parent app disables oauth, render empty enabled array

    # TODO: FIX can't access app_config here b/c initializers loaded on app load
    # which is run for all rails commands. prevents db from getting created
    
    # app_config = Core::Config::App.generate_config
    # oauth_disabled = app_config.keys.include?(:oauth_enabled) && !app_config[:oauth_enabled]
    
    Core::Config::App.dynamic_config << { 
      key: :oauth_providers, 
      build: Proc.new { 
        { 
          available: Core::Auth::Providers::OmniAuth.available_providers.map { |p| p.as_json[:k] }, 
          # enabled: oauth_disabled ? [] : Core::Auth::Providers::OmniAuth.enabled_providers.map { |p| p.as_json([:k, :path]) }
          enabled: Core::Auth::Providers::OmniAuth.enabled_providers.map { |p| p.as_json([:k, :path]) }
        } 
      } 
    }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end