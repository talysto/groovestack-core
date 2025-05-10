puts "groovestack auth settings"
module Groovestack
  module Auth
    module Settings
      extend ActiveSupport::Concern

      included do
        extend Dry::Configurable

        # NOTE: this impact user devise migration changes. Be sure
        # to set / override this when initialling integrating with groovestack-auth
        setting :devise_modules, default: [
          :database_authenticatable,
          :registerable,
          :recoverable,
          :rememberable,
          :validatable,
          :confirmable,
          :lockable,
          :timeoutable,
          :trackable,
          :magic_link_authenticatable,
          :omniauthable,
          omniauth_providers: %i[apple facebook google]
        ], reader: true

        setting :devise_for_routes_kwargs, default: {
          controllers: {
            omniauth_callbacks: 'groovestack/auth/omniauth_callbacks',
            sessions: 'groovestack/auth/passwordless/sessions'
          }
        }, reader: true

        setting :disabled_providers, default: [], reader: true

        setting :omniauth_origin_url, default: nil, reader: true
        setting :after_sign_in_path, default: nil, reader: true
        setting :allow_other_host_redirects, default: false, reader: true
      end
    end
  end
end