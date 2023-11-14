$CORE_CONFIG_AUGMENTED = false unless $CORE_CONFIG_AUGMENTED

available_oauth_providers = [{ k: :google, required_credentials: [ :GOOGLE_CLIENT_ID, :GOOGLE_CLIENT_SECRET ] }].map { |p| p.merge(path: "/users/auth/#{p[:k]}") }

enabled_oauth_providers = available_oauth_providers.select { |provider| provider[:required_credentials].all? { |credential| Rails.application.credentials.send(credential).present? } } 

ActiveSupport.on_load(:after_initialize) do
  unless $CORE_CONFIG_AUGMENTED || !defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }
    Core::Config::App.dynamic_config << { key: :oauth_providers, build: Proc.new { { available: available_oauth_providers, enabled: enabled_oauth_providers } } }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end