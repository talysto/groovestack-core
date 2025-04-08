# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  Groovestack::Auth.configured_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).each do |p|
    provider(*p.generate_omniauth_args)
  end
end

module Groovestack
  module Auth
    class OmniauthFailureEndpoint < OmniAuth::FailureEndpoint
      def call
        # raise_out! if OmniAuth.config.failure_raise_out_environments.include?(ENV['RACK_ENV'].to_s)
        redirect_to_failure
      end
    end
  end
end

OmniAuth.config.on_failure = Groovestack::Auth::OmniauthFailureEndpoint

module OmniAuth
  module Strategies
    class Apple < OmniAuth::Strategies::OAuth2
      def request_phase
        # https://github.com/omniauth/omniauth/issues/975

        # since apple uses POST to callback, can't store in session
        # need to store omniauth params as a cookie

        auth_params = authorize_params # add state & nonce to session values to persisted cookies

        cookies.encrypted['apple_omniauth_params'] = {
          same_site: :none,
          expires: 1.minute.from_now,
          secure: true,
          value: JSON.generate({ origin: session['omniauth.origin'] || request.env['HTTP_REFERER'],
                                 state: auth_params[:state], nonce: auth_params[:nonce] })
        }

        super
      end

      def callback_phase # rubocop:disable Metrics/AbcSize
        # add omniauth params back to session

        apple_omniauth_params = JSON.parse(cookies.encrypted['apple_omniauth_params'])
        cookies.delete('apple_omniauth_params')
        env['omniauth.origin'] = apple_omniauth_params['origin']
        session['omniauth.origin'] = apple_omniauth_params['origin']
        session['omniauth.state'] = apple_omniauth_params['state']
        session['omniauth.nonce'] = apple_omniauth_params['nonce']

        super
      end

      def authorize_params
        # memoize so they aren't regenerated in the request_phase super call
        @authorize_params ||= super.merge(nonce: new_nonce)
      end

      private

      def cookies
        request.env['action_dispatch.cookies']
      end
    end
  end
end
