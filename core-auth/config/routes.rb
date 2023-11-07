$CORE_AUTH_ROUTES_SET = false unless $CORE_AUTH_ROUTES_SET

Core::Auth::Engine.routes.draw do
  unless $CORE_AUTH_ROUTES_SET # prevent routes being redrawn
    devise_for :users

    post "/users/auth/google"  => 'core/auth/omniauth_callbacks#passthru'
    get "/users/auth/google/callback"  => 'core/auth/omniauth_callbacks#google'

    $CORE_AUTH_ROUTES_SET = true
  end
end