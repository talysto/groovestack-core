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