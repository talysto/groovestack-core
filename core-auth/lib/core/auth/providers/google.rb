module Core
  module Auth
    module Providers
      class Google < OmniAuth
        PROVIDER = :google_oauth2
        K = :google
        REQUIRED_CREDENTIALS = [:GOOGLE_CLIENT_ID, :GOOGLE_CLIENT_SECRET]

        def self.generate_omniauth_args 
          super << { name: k, origin_param: 'return_to' }
        end
      end
    end
  end
end