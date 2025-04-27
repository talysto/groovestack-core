# frozen_string_literal: true

module Groovestack
  module Auth
    module Passwordless
      class SessionsController < ::Devise::SessionsController
        skip_before_action :verify_authenticity_token #, only: :destroy

        def create
          self.resource = resource_class.find_for_authentication(email: create_params[:email])

          unless self.resource.present?
            # register a new account

            u = ::User.new(email: create_params[:email], password: ::Devise.friendly_token[0, 20])
            # u.skip_confirmation_notification!
            u.save!

            self.resource = u
          end

          send_magic_link(resource)

          respond_to do |format|
            format.html { redirect_to(after_magic_link_sent_path_for(resource), status: devise_redirect_status) }
            format.json { render json: { success: true, resource: resource.as_json, message: 'Magic link sent.' }, status: :ok }
          end
        
        rescue StandardError => e
          msg = "Passwordless Magic Link Send Failure for #{create_params[:email]}: #{e}"
          ::Groovestack::Base.notify_error('Groovestack::Auth::Passwordless::SessionsController', msg)

          
          respond_to do |format|
            format.html { render :new, status: devise_error_status }
            format.json { render json: { error: 'User not found or unable to register account. Our team has been notified.' }, status: :not_found }
          end
        end

        protected

        def send_magic_link(resource)
          resource.send_magic_link(remember_me: create_params[:remember_me])
        end

        def translation_scope
          if action_name == "create"
            "devise.passwordless"
          else
            super
          end
        end

        private

        def create_params
          resource_params.permit(:email, :remember_me)
        end

        # Devise < 4.9 fallback support
        # See: https://github.com/heartcombo/devise/wiki/How-To:-Upgrade-to-Devise-4.9.0-%5BHotwire-Turbo-integration%5D
        def devise_redirect_status
          ::Devise.try(:responder).try(:redirect_status) || :found
        end

        def devise_error_status
          ::Devise.try(:responder).try(:error_status) || :ok
        end
      end
    end
  end
end