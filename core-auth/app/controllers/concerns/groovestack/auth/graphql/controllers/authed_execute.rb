module Groovestack
  module Auth
    module GraphQL
      module Controllers
        module AuthedExecute
          extend ActiveSupport::Concern
          
          include ::Groovestack::Base::GraphQL::Controllers::Execute
          include ::Groovestack::Auth::GraphQL::Controllers::AuthHelpers
        end
      end
    end
  end
end