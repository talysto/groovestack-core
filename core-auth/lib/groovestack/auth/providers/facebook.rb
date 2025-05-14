# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Facebook < OmniAuth
        PROVIDER = :facebook
        K = :facebook
        REQUIRED_CREDENTIALS = %i[app_id app_secret].freeze

        def self.generate_omniauth_args
          [*super, { client_options: { site: 'https://graph.facebook.com/v22.0' } }]
        end
      end
    end
  end
end
