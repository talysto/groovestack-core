$CORE_CONFIG_AUGMENTED = false unless $CORE_CONFIG_AUGMENTED

ActiveSupport.on_load(:after_initialize) do
  unless $CORE_CONFIG_AUGMENTED || !defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    # if parent app disables oauth, render empty enabled array
    app_config = Core::Config::App.generate_config
    oauth_disabled = app_config.keys.include?(:oauth_enabled) && !app_config[:oauth_enabled]
    
    Core::Config::App.dynamic_config << { 
      key: :oauth_providers, 
      build: Proc.new { 
        { 
          available: Core::Auth::Providers::OmniAuth.available_providers.map { |p| p.as_json[:k] }, 
          enabled: oauth_disabled ? [] : Core::Auth::Providers::OmniAuth.enabled_providers.map { |p| p.as_json([:k, :path]) }
        } 
      } 
    }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end