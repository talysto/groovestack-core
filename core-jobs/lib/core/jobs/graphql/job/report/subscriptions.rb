module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          module Subscriptions
            extend ActiveSupport::Concern

            class Instance < ::Core::Base::GraphQL::BaseSubscription
              argument :id, ::GraphQL::Types::ID, required: true

              type ::Core::Base::GraphQL::Types::SubscriptionPayload, null: false

              QUERY_STRING = <<-GRAPHQL
                query JobReport($id: ID!, $meta: JobReportBuildParamsType) {
                  JobReport(id: $id, meta:$meta){
                    id
                    data
                  }
                }
              GRAPHQL

              def subscribe(id:)
                payload(id: id, event: { type: :subscribe })
              end

              def update(id:)
                report = generate_report(id: id)

                event = {
                  type: object[:crud_action], # this is fed by the trigger handler
                  payload: { 
                    ids: [id], 
                    data: report.to_h["data"]["JobReport"]["data"]
                  },
                }

                payload(id: id, event: event)
              end

              # HELPER METHODS

              def generate_report(id:)
                variables = { id: id, meta: nil }

                context[:schema].execute self.class::QUERY_STRING, variables: variables
              end

              def payload(id:, event:)
                {
                  topic: "resource/JobReport/id",
                  event: event,
                }
              end
            end

            included do
              field :JobReport, subscription: ::Core::Jobs::GraphQL::Job::Report::Subscriptions::Instance
            end
          end
        end
      end
    end
  end
end