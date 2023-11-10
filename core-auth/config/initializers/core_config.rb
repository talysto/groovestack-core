$CORE_CONFIG_AUGMENTED = false unless $CORE_CONFIG_AUGMENTED

ActiveSupport.on_load(:after_initialize) do
  unless $CORE_CONFIG_AUGMENTED || !defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :has_admins, build: Proc.new { User.admins.count.positive? } }
    Core::Config::App.dynamic_config << { key: :user_roles, build: Proc.new { User::ROLES } }

    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end