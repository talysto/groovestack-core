module Core
  module Jobs
    module GraphQL
      module Job
        module Subscriptions 
          extend ActiveSupport::Concern

          included do
            include ::Core::Jobs::GraphQL::Job::Report::Subscriptions
          end
        end
      end
    end
  end
end