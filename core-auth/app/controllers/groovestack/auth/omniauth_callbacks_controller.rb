# frozen_string_literal: true

module Groovestack
  module Auth
    class OmniauthCallbacksController < ::Devise::OmniauthCallbacksController
      include ::Devise::Controllers::Rememberable

      skip_before_action :verify_authenticity_token
      before_action :set_auth_hash

      Groovestack::Auth.configured_providers(ancestor: Groovestack::Auth::Providers::OmniAuth).each do |p|
        define_method(p.k) do
          handle_oauth(provider: p.k.to_s.capitalize)
        end
      end

      def failure
        # override for error notifications & to support custom origin redirects
  
        known_reasons = %w[user_cancelled_authorize user_denied]
  
        handled = known_reasons.any? do |reason|
          request.params&.dig('error_reason') == reason || request.params&.dig('error') == reason
        end
  
        if !handled && Rails.env.production?
          failure_kind = OmniAuth::Utils.camelize(failed_strategy.name)
          blob = {
            kind: failure_kind,
            reason: failure_message,
            params: request.params,
            omniauth: request.env['omniauth.auth']
          }
  
          exception = OmniauthFailureError.new(blob.to_s)
                  
          ::Groovestack::Base.notify_error('Groovestack::Auth::OmniauthCallbacksController.omniauth_failure', exception)
        end
  
        set_flash_message! :alert, :failure, kind: failure_kind, reason: failure_message
        redirect_to after_omniauth_failure_path_for(resource_name), allow_other_host: ::Groovestack::Auth.allow_other_host_redirects
      end

      protected

      def set_auth_hash
        # set omniauth.auth for /callback requests (that skip the request phase)
        return unless params['omniauth'].present?
  
        # only set if not already set (i.e. no override)
        request.env['omniauth.auth'] ||= JSON.parse(params['omniauth'].to_json, object_class: OmniAuth::AuthHash)
      end
  
      def after_omniauth_failure_path_for(scope)
        if (origin_url = omniauth_request_origin)
          return origin_url
        end

        super
      end
  
      def omniauth_request_origin
        # TODO: validate custom origin is whitelisted
        
        if same_origin_request? && (origin_url = ::Groovestack::Auth.omniauth_origin_url)
          return origin_url
        end
  
        request.env['omniauth.origin']
      end

      private

      def json_format?
        # WHY necessary?
        # request.format.json? may not be set correctly for FE auth that handles the 
        # request phase and only hits /callback
        # request.path_parameters[:format] is set to 'json' in the same case
        request.format.json? || request.path_parameters[:format] == 'json'
      end
  
      def same_origin_request?
        return true unless request.env['omniauth.origin'].present?
        
        request.env['omniauth.origin'].starts_with?(request.base_url)
      end

      def add_search_params(url, params)
        uri = URI.parse(url)
        existing_params = Rack::Utils.parse_nested_query(uri.query)
        merged_params = existing_params.merge(params.deep_stringify_keys)
        uri.query = Rack::Utils.build_nested_query(merged_params)
        uri.to_s
      end

      def handle_oauth(provider:)
        auth = request.env['omniauth.auth']
  
        identity_params = { 
          auth: auth,
          user_attrs: {
            defaults: {
              password: ::Devise.friendly_token[0, 20]
            }
          }
        }
  
        @user = ::Identity.find_or_create_from_omniauth!(**identity_params).user

        begin
          if !@user.confirmed?
            @user.skip_confirmation_notification! # skip sending confirmation email
            @user.confirm
          end
        rescue StandardError => e
          msg = "OmniAuth Callback Confirmation Failure: #{e}"
          ::Groovestack::Base.notify_error(e.class, msg)
        end

        remember_me @user
        sign_in(:user, @user)

        if json_format?
          # return connected identity info for FE user hydration
          render json: @user.slice(:id, :email, :name), status: :ok
        else
          if same_origin_request?
            redirect_to after_sign_in_path_for(@user)
          else 
            redirect_to omniauth_request_origin, allow_other_host: ::Groovestack::Auth.allow_other_host_redirects
          end
        end
      rescue ActiveRecord::RecordInvalid => e
        # let FE handle missing email gracefully
        if e.record.errors[:email].present? && e.record.errors[:email].include?("can't be blank")
          redirect_to add_search_params(after_omniauth_failure_path_for(resource_name), { errors: { email_missing: true} }), allow_other_host: ::Groovestack::Auth.allow_other_host_redirects
        else
          raise e
        end
      end
    end
  end
end
