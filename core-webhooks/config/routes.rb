Core::Webhooks::Railtie.routes.draw do
  scope Core::Webhooks.routes_scope do 
    Core::Webhooks.enabled_providers.each do |provider|
      post provider, controller: "core/webhooks/controllers/event", action: provider #, source: provider
    end
  end
end