# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Facebook < OmniAuth
        PROVIDER = :facebook
        K = :facebook
        REQUIRED_CREDENTIALS = [:FACEBOOK_APP_ID, :FACEBOOK_APP_SECRET]

        def self.generate_omniauth_args
          super << { name: k, origin_param: 'return_to' }
        end
      end
    end
  end
end