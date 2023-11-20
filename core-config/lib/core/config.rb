# frozen_string_literal: true

require_relative "config/version"
require_relative "config/railtie" if defined?(Rails::Railtie)
require_relative "config/graphql/app/queries"

module Core
  module Config
    class Error < StandardError; end
    
    class App      
      @@config = { app_level: 0 }
      @@dynamic_config = []

      def self.generate_config
        @@config.merge(
          @@dynamic_config.inject({}) do |config, rule|
            config[rule[:key]] = rule[:build].call
            config
          end
        )
      end

      def self.dynamic_config
        self.class_variable_get(:@@dynamic_config)
      end

      def self.dynamic_config_include?(key)
        self.dynamic_config.any? { |rule| rule[:key] == key }
      end
    end
  end
end