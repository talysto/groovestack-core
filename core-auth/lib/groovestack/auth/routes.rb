# frozen_string_literal: true

module Groovestack
  module Auth
    module Routes
      extend ActiveSupport::Concern

      class_methods do
        def draw_routes(mapper)
          mapper.instance_exec do
            devise_for :users, ::Groovestack::Auth.devise_for_routes_kwargs
        
            devise_scope :user do
              post 'users/magic_link', to: 'groovestack/auth/passwordless/magic_links#show'

              if defined?(OmniAuth)
                match '/users/auth/:provider/callback', to: 'groovestack/auth/omniauth_callbacks#verified', via: %i[get post],
                                                        as: :omniauth_callback
              end
            end
          end
        end
      end
    end
  end
end 