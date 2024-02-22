module Core
  module Webhooks
    module Handlers
      class Shopify < Core::Webhooks::Handler
        extend Dry::Configurable

        setting :events do 
          setting :handlers
        end

        setting :api_key
      end
    end
  end
end