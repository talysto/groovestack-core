module Groovestack
  module Base
    module Settings
      extend ActiveSupport::Concern

      included do
        extend Dry::Configurable

        DEFAULT_ERROR_MONITOR =  ::Logger.new($stdout)
    
        # ex:
        #   /config/initializers/core_base.rb
    
        #   Groovestack::Base.configure do |config|
        #     config.error_notifier.handler = Bugsnag
        #   end
        setting :error_notifier, reader: true do
          setting :handler, reader: true
          setting :notify_method, reader: true, default: :notify
        end
    
        setting :graphql do
          setting :camelize, default: false
        end
    
        def self.notify_error(prefix, err)
          msg = "#{[prefix, 'error'].compact.join(' ')}: #{err}"
    
          if error_notifier&.handler.present?
            error_notifier.handler.send(error_notifier.notify_method, msg)
          else
            DEFAULT_ERROR_MONITOR.error(msg)
          end
        end
      end
    end
  end
end
