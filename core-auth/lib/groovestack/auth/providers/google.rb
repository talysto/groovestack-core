# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Google < OmniAuth
        PROVIDER = :google_oauth2
        K = :google
        REQUIRED_CREDENTIALS = %i[GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET].freeze

        def self.generate_omniauth_args
          super << { name: k, origin_param: 'return_to' }
        end
      end
    end
  end
end
