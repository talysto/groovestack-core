$CORE_AUTH_OMNIAUTH_INITED = false unless $CORE_AUTH_OMNIAUTH_INITED

# puts "core-auth: omniauth.rb. Inited: #{$CORE_AUTH_OMNIAUTH_INITED}"

unless $CORE_AUTH_OMNIAUTH_INITED     
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, Rails.application.credentials.GOOGLE_CLIENT_ID, Rails.application.credentials.GOOGLE_CLIENT_SECRET, name: 'google'
  end

  $CORE_AUTH_OMNIAUTH_INITED = true
end
