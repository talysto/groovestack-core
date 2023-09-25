module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          module Subscriptions
            extend ActiveSupport::Concern

            class Instance < ::Core::Base::GraphQL::BaseSubscription
              argument :id, String, required: true

              # type ::Core::Jobs::GraphQL::Job::Report::Type, null: false
              # field :payload, ::GraphQL::Types::JSON, null: false
              field :topic, String, null: false
              field :event, ::GraphQL::Types::JSON, null: false

              # QUERY_STRING = <<-GRAPHQL
              #   query JobReport($id: String!, $meta: JobReportBuildParamsType) {
              #     JobReport(id: $id, meta:$meta){
              #       id
              #       data
              #     }
              #   }
              # GRAPHQL

              def authorized?(id:)
                return true if context[:current_user].admin?

                raise ::GraphQL::ExecutionError, 'only admin can subscript to job reports'
              end

              def subscribe(id:)
                # payload(id: id)
                # super # no response
                payload(id: id, object: { crud_action: :subscribe, record: nil })
              end

              def update(id:)
                payload(id: id, object: object)
              end

              # HELPER METHODS

              # def generate_report(id:)
              #   variables = { meta: { params: { "filter": { "report_name": id } } } }

                
              #   context[:schema].execute self.class::QUERY_STRING, variables: variables
              # end

              def payload(id:, object:)
                # result = generate_report(id: id)

                # result.to_h["data"]["JobReport"].first
                {
                  topic: "resource/JobReport/id",
                  event: {
                    type: object[:crud_action],
                    payload: { ids: [id], record: object[:record]},
                  },
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