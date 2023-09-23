module Core
  module Jobs
    module GraphQL
      module Job
        module Report
          module Subscriptions
            extend ActiveSupport::Concern

            class Update < ::Core::Base::GraphQL::BaseSubscription
              argument :report_name, String, required: true

              type ::Core::Jobs::GraphQL::Job::Report::Type, null: false
              # field :payload, ::GraphQL::Types::JSON, null: false

              QUERY_STRING = <<-GRAPHQL
                query all_job_reports($filter: JobReportFilter) {
                  all_job_reports(filter: $filter){
                    id
                    data
                  }
                }
              GRAPHQL

              def authorized?(report_name:)
                return true if context[:current_user].admin?

                raise ::GraphQL::ExecutionError, 'only admin can subscript to job reports'
              end

              def subscribe(report_name:)
                payload(report_name: report_name)
              end

              def update(report_name:)
                payload(report_name: report_name)
              end

              # HELPER METHODS

              def generate_report(report_name:)
                variables = {"filter": { "report_name": report_name }}

                
                context[:schema].execute self.class::QUERY_STRING, variables: variables
              end

              def payload(report_name:)
                result = generate_report(report_name: report_name)

                result.to_h["data"]["all_job_reports"].first
              end
            end

            included do
              field :jobs_reports_update, subscription: ::Core::Jobs::GraphQL::Job::Report::Subscriptions::Update
            end
          end
        end
      end
    end
  end
end
          