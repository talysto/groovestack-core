module Core
  module Jobs
    module Listeners
      class QueState
        include ::Core::Base::Listener
        
        def self.init(throttle_seconds: 3)
          que_state_publisher = ::Core::Jobs::PubSub::QueStatePublisher.new
          que_state_db_listener = ::Core::Base::Listeners::Database.new('que_state')
          subscriptions = [
            {
              name: :JobReport,
              ids: [:jobs_by_type, :jobs_kpis, :jobs_by_period],
            }
          ]

          notify_event_handler = throttle(throttle_seconds)

          que_state_db_listener.listen do |payload| 
            # ex event
              # {
              #   "message_type":"job_change",
              #   "id":1186,
              #   "queue":"default",
              #   "tags":[],
              #   "run_at":"2023-09-27T00:53:50.497521Z",
              #   "time":"2023-09-27T17:10:37.079430Z",
              #   "job_class":"ExampleJob",
              #   "previous_state":"errored",
              #   "current_state":"nonexistent"
              # }

              notify_event_handler.call do |args|
              event = { crud_action: :update, payload: JSON.parse(payload) }

              subscriptions.each do |subscription|
                subscription[:ids].each do |id|
                  que_state_publisher.notify_event(subscription[:name], id, event)
                end
              end
            end
          end

          que_state_db_listener
        end
      end
    end
  end
end