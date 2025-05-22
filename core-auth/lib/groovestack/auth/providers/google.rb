# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Google < OmniAuth
        PROVIDER = :google_oauth2
        K = :google
        REQUIRED_CREDENTIALS = %i[client_id client_secret].freeze

        def self.generate_omniauth_args
          super << { name: k, origin_param: 'return_to' }
        end
      end
    end
  end
end
