ActiveSupport.on_load(:after_initialize) do
  if defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    Core::Config::App.dynamic_config << { 
      key: :oauth_providers, 
      build: Proc.new { 
        { 
          available: Core::Auth::Providers::OmniAuth.available_providers.map { |p| p.as_json[:k] }, 
          enabled: Core::Auth::Providers::OmniAuth.enabled_providers.map { |p| p.as_json([:k, :path]) }
        } 
      } 
    }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end