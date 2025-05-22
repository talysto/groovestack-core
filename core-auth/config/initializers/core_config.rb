# frozen_string_literal: true

ActiveSupport.on_load(:after_initialize) do # rubocop:disable Metrics/BlockLength
  if defined?(Groovestack::Config)
    Groovestack::Config::App.dynamic_config << {
      key: :oauth_providers,
      build: proc do
        {
          available: Groovestack::Auth.available_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map do |p|
            p.as_json[:k]
          end,
          enabled: Groovestack::Auth.enabled_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).map do |p|
            p.as_json(%i[k path])
          end,
          configured: Groovestack::Auth.configured_providers(
            ancestor: Groovestack::Auth::Providers::OmniAuth
          ).map do |p|
            p.as_json(%i[k provider path])
          end
        }
      end
    }

    Groovestack::Config::App.dynamic_config << {
      key: :auth_providers,
      build: proc do
        {
          available: Groovestack::Auth.available_providers.map { |p| p.as_json(%i[k provider]) },
          enabled: Groovestack::Auth.enabled_providers.map { |p| p.as_json(%i[k provider path]) },
          configured: Groovestack::Auth.configured_providers.map { |p| p.as_json(%i[k provider path]) }
        }
      end
    }
  end
end
