# frozen_string_literal: true

module Groovestack
  module Auth
    class AuthenticatedApiController < ApplicationController
      prepend_before_action :authenticate_user!
      protect_from_forgery prepend: true, with: :reset_session unless -> { Rails.env.test? }
    end
  end
end
