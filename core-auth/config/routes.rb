# frozen_string_literal: true

Groovestack::Auth::Railtie.routes.draw do
  if defined?(Devise)
    devise_scope :user do
      match '/users/auth/:provider/callback', to: 'groovestack/auth/omniauth_callbacks#verified', via: %i[get post],
                                              as: :omniauth_callback
      get '/users/auth/failure', to: 'groovestack/auth/omniauth_callbacks#omniauth_failure', as: :omniauth_failure
    end
  end
end
