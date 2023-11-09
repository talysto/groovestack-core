$CORE_AUTH_OMNIAUTH_INITED = false unless $CORE_AUTH_OMNIAUTH_INITED

# puts "core-auth: omniauth.rb. Inited: #{$CORE_AUTH_OMNIAUTH_INITED}"

unless $CORE_AUTH_OMNIAUTH_INITED     
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, "619539414288-8oe44detcavkrj7dv1mv1nacbffvn1qs.apps.googleusercontent.com", "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", name: 'google'
  end

  $CORE_AUTH_OMNIAUTH_INITED = true
end
