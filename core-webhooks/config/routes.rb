Core::Webhooks::Railtie.routes.draw do
  scope Core::Webhooks.routes_scope do 
    scope :webhooks_event do
      post :create, controller: "core/webhooks/controllers/event"
    end
  end
end