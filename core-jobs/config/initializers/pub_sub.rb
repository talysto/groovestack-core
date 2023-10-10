ActiveSupport.on_load(:after_initialize) do
  ::Core::Jobs::PubSub::QueStatePublisher.subscribe(::Core::Jobs::PubSub::QueStateSubscriber.new) if defined?(Wisper)
end