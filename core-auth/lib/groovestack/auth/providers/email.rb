# frozen_string_literal: true

module Groovestack
  module Auth
    module Providers
      class Email < Groovestack::Auth::Provider
        PROVIDER = :email

        def self.configured?
          true
        end
      end
    end
  end
end
