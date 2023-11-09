$CORE_CONFIG_AUGMENTED = false unless $CORE_CONFIG_AUGMENTED

ActiveSupport.on_load(:after_initialize) do
  unless $CORE_CONFIG_AUGMENTED || !defined?(Core::Config)
    Core::Config::App.dynamic_config << { key: :app_init, build: Proc.new { User.count.positive? ? 1 : 0 } } unless Core::Config::App.dynamic_config_include?(:app_init)
    
    # make AppConfig query public
    ::Types::QueryType.fields["AppConfig"].instance_variable_set(:@authenticate, false)
  end
end