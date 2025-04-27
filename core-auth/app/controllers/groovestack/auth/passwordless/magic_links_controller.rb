# frozen_string_literal: true

module Groovestack
  module Auth
    module Passwordless
      class MagicLinksController < ::DeviseController
        skip_before_action :verify_authenticity_token
        prepend_before_action :require_no_authentication, only: :show
        prepend_before_action :allow_params_authentication!, only: :show
        prepend_before_action(only: [:show]) { request.env["devise.skip_timeout"] = true }

        def show
          self.resource = warden.authenticate!(auth_options)

          # begin
          #   if !resource.confirmed?
          #     resource.skip_confirmation_notification! # skip sending confirmation email
          #     resource.confirm
          #   end
          # rescue StandardError => e
          #   msg = "Passwordless Magic Link Confirmation Failure: #{e}"
          #   Bugsnag.notify(msg)
          #   logger.error msg
          # end

          set_flash_message!(:notice, :signed_in)
          sign_in(resource_name, resource, event: :authentication)
          yield resource if block_given?

          respond_to do |format|
            format.html { redirect_to after_sign_in_path_for(resource) }
            format.json { render json: { success: true, resource: resource.as_json, status: :ok } }
          end
        end

        protected

        def auth_options
          mapping = ::Devise.mappings[resource_name]
          { scope: resource_name, recall: "#{mapping.controllers[:sessions]}#new" }
        end

        def translation_scope
          "devise.sessions"
        end

        private

        def resource_params
          params.permit({ user: [:email, :remember_me, :token] })
        end

        def create_params
          resource_params.permit({ user: [:email, :remember_me] })
        end
      end
    end
  end
end
