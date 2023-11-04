Core::Auth::Engine.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'core/auth/omniauth_callbacks' }
end