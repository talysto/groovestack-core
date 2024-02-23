ActiveSupport.on_load(:after_initialize) do
  # ensure all handlers are loaded to enable Core::Webhooks.handler_for method
  ::Core::Webhooks::Handlers.eager_load!
end