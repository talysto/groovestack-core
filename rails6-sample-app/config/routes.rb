Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/api/admin', to: 'graphql#execute'
  post '/api/user', to:  'graphql#execute'
end
