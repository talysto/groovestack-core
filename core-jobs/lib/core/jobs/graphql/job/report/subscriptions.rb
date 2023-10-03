module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          module Subscriptions
            extend ActiveSupport::Concern

            class Instance < ::Core::Base::GraphQL::BaseSubscription
              argument :id, String, required: true

              QUERY_STRING = <<-GRAPHQL
                query JobReport($id: String!, $meta: JobReportBuildParamsType) {
                  JobReport(id: $id, meta:$meta){
                    id
                    data
                  }
                }
              GRAPHQL

              def authorized?(id:)
                return true if context[:current_user].admin?

                raise ::GraphQL::ExecutionError, 'only admin can subscript to job reports'
              end

              def subscribe(id:)
                # payload(id: id)
                # super # no response
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
              field :JobReport_instance, subscription: ::Core::Jobs::GraphQL::Job::Report::Subscriptions::Instance
            end
          end
        end
      end
    end
  end
end