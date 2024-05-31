module Core
  module Auth
    module Providers
      class Apple < OmniAuth
        PROVIDER = :apple
        REQUIRED_CREDENTIALS = [:APPLE_CLIENT_ID, :APPLE_TEAM_ID, :APPLE_KEY_ID, :APPLE_PEM_CONTENT]

        def self.generate_omniauth_args 
          [
            provider,
            Rails.application.credentials.APPLE_CLIENT_ID,
            '',
            {
              team_id: Rails.application.credentials.APPLE_TEAM_ID,
              key_id: Rails.application.credentials.APPLE_KEY_ID,
              pem: Rails.application.credentials.APPLE_PEM_CONTENT,
              origin_param: 'return_to'
            }
          ]
        end
      end
    end
  end
end