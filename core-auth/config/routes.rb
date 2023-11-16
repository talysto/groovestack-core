$CORE_AUTH_ROUTES_SET = false unless $CORE_AUTH_ROUTES_SET

Core::Auth::Engine.routes.draw do
  unless $CORE_AUTH_ROUTES_SET # prevent routes being redrawn
    devise_scope :user do
      match "/users/auth/:provider/callback", to: 'core/auth/omniauth_callbacks#verified', via: [:get, :post], as: :omniauth_callback
    end

    $CORE_AUTH_ROUTES_SET = true
  end
end