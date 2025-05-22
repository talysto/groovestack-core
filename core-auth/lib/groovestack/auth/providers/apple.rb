# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Apple < OmniAuth
        PROVIDER = :apple
        REQUIRED_CREDENTIALS = %i[client_id team_id key_id pem_content].freeze

        def self.generate_omniauth_args
          [
            provider,
            credential_for(:client_id),
            '',
            {
              team_id: credential_for(:team_id),
              key_id: credential_for(:key_id),
              pem: credential_for(:pem_content),
              origin_param: 'return_to'
            }
          ]
        end
      end
    end
  end
end
