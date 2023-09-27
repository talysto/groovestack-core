module Core
  module Jobs
    module Listener
      def self.init_all 
        [init_que_state_db_listener]
      end

      def self.init_que_state_db_listener
        que_state_publisher = ::Core::Jobs::Publishers::QueState.new
        que_state_db_listener = ::Core::Base::Listeners::Database.new('que_state')
        subscriptions = [
          {
            name: :JobReport_instance,
            ids: [:jobs_by_type, :jobs_kpis, :jobs_by_period],
          }
        ]

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

          event = { crud_action: :update, payload: JSON.parse(payload) }

          subscriptions.each do |subscription|
            subscription[:ids].each do |id|
              que_state_publisher.notify_event(subscription[:name], id, event)
            end
          end
        end

        que_state_db_listener
      end
    end
  end
end 

ActiveSupport.on_load(:after_initialize) do
  ::Core::Jobs::Publishers::QueState.subscribe(::Core::Jobs::Subscribers::QueState.new)
end