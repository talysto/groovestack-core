$CORE_AUTH_OMNIAUTH_INITED = false unless $CORE_AUTH_OMNIAUTH_INITED

unless $CORE_AUTH_OMNIAUTH_INITED     
  Rails.application.config.middleware.use OmniAuth::Builder do
    Core::Auth::Providers::OmniAuth.enabled_providers.each do |p|
      provider *p.generate_omniauth_args
    end
  end

  $CORE_AUTH_OMNIAUTH_INITED = true
end