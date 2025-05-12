# frozen_string_literal: true

require 'devise'
require 'devise/passwordless'
require 'rotp'

require 'groovestack/identities'
require 'groovestack/config'

require 'groovestack/auth/version'
require 'groovestack/auth/engine' if defined?(Rails::Engine)
require 'groovestack/auth/settings'
require 'groovestack/auth/routes'

module Groovestack
  module Auth
    module Passwordless
      autoload :TOtpTokenizer, 'groovestack/auth/passwordless/t_otp_tokenizer'
    end

    autoload :Provider, 'groovestack/auth/provider'

    module Providers
      extend ActiveSupport::Autoload

      eager_autoload do
        autoload :Email, 'groovestack/auth/providers/email'
        if defined?(OmniAuth)
          autoload :OmniAuth, 'groovestack/auth/providers/omni_auth'
          autoload :Apple, 'groovestack/auth/providers/apple'
          autoload :Facebook, 'groovestack/auth/providers/facebook'
          autoload :Google, 'groovestack/auth/providers/google'
        end
      end
    end

    if defined?(OmniAuth)
      autoload :OmniauthFailureEndpoint, 'groovestack/auth/omniauth_failure_endpoint'
    end

    include ::Groovestack::Auth::Settings
    include ::Groovestack::Auth::Routes
  end
end

# Include Auth concerns after Rails is fully loaded
ActiveSupport.on_load(:devise) do
  ::GraphQL::User::Type.class_eval do
    include ::GraphQL::UserExtensions
  end

  ::GraphQL::Identity::Type.class_eval do
    include ::GraphQL::IdentityExtensions
  end
end
