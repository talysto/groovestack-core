# frozen_string_literal: true

module Groovestack
  module Base
    module Settings
      extend ActiveSupport::Concern

      included do
        extend Dry::Configurable

        setting :error_notifier, reader: true do
          setting :handler, reader: true, default: ::Logger.new($stdout)
          setting :notify_method, reader: true, default: :info
        end

        setting :graphql do
          setting :camelize, default: false
        end

        def self.notify_error(prefix, err)
          msg = "#{[prefix, 'error'].compact.join(' ')}: #{err}"

          error_notifier.handler.send(error_notifier.notify_method, msg)
        end
      end
    end
  end
end
