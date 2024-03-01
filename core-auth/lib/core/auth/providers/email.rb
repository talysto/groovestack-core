module Core
  module Auth
    module Providers
      class Email < Core::Auth::Provider
        PROVIDER = :email

        def self.configured?
          true
        end
      end
    end
  end
end