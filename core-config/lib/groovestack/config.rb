# frozen_string_literal: true

require 'groovestack/base'

require_relative 'config/version'
require_relative 'config/railtie' if defined?(Rails::Railtie)
require_relative 'config/graphql/app/queries'

module Groovestack
  module Config
    class Error < StandardError; end

    class App
      # rubocop:disable Style/ClassVars
      @@config = { app_level: 0 }
      @@dynamic_config = []
      # rubocop:enable Style/ClassVars

      def self.generate_config
        @@config.merge(
          @@dynamic_config.each_with_object({}) do |rule, config|
            config[rule[:key]] = rule[:build].call
          end
        )
      end

      def self.dynamic_config
        class_variable_get(:@@dynamic_config)
      end

      def self.dynamic_config_include?(key)
        dynamic_config.any? { |rule| rule[:key] == key }
      end
    end
  end
end
