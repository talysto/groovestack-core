Core::Webhooks::Railtie.routes.draw do
  scope Core::Webhooks.routes_scope do 
    post :webhook_event, controller: "core/webhooks/controllers/event"
  end
end