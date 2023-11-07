Rails.application.config.middleware.use OmniAuth::Builder do
#   config.omniauth :google_oauth2, "619539414288-8oe44detcavkrj7dv1mv1nacbffvn1qs.apps.googleusercontent.com", "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", name: :google

  provider :google_oauth2, "619539414288-8oe44detcavkrj7dv1mv1nacbffvn1qs.apps.googleusercontent.com", "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"
end