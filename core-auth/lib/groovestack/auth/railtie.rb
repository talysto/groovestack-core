# frozen_string_literal: true

require_relative 'provider'

if defined?(Rails)
  module Groovestack
    module Auth
      class Railtie < ::Rails::Engine
        include ::Groovestack::Base::CoreRailtie

        def dx_validations
          [
            {
              eval: proc { raise unless defined?(::Groovestack::Base) },
              message: "Error: 'core-base' gem is required, add it your your gemfile"
            },
            {
              eval: proc { raise unless defined?(::Core::Config) },
              message: "Error: 'core-config' gem is required, add it your your gemfile"
            },
            {
              eval: proc {
                raise if ::Groovestack::Auth.enabled_providers_sans_configuration.present?
              },
              message: missing_configuration_msg
            }
          ]
        end

        def providers_missing_configuration
          ::Groovestack::Auth.enabled_providers_sans_configuration.map do |h|
            "#{h.provider.to_s.titleize} - #{h.required_credentials.join(', ')}"
          end
        end

        def missing_configuration_msg
          msg = "\n\tWarning: enabled providers are missing required credentials:\n\t\t"
          msg += providers_missing_configuration.join("\n\t\t")
          "#{msg}\n\tAdd them to your credentials file or disable the providers by adding them to Groovestack::Auth.disabled_providers." # rubocop:disable Layout/LineLength
        end

        def module_description
          avail = ::Groovestack::Auth.available_providers.map(&:k).map(&:to_s).map(&:titleize)
          descr = "\n\tAvailable auth providers: #{avail.join(', ')}"
          enabled = ::Groovestack::Auth.enabled_providers.map(&:k).map(&:to_s).map(&:titleize)
          descr += "\n\tEnabled auth providers: #{enabled.join(', ')}"
          descr
        end

        initializer :append_migrations do |app|
          append_migrations app
        end

        initializer :append_initializers do |app|
          append_initializers app
        end

        config.after_initialize do
          after_init
        end
      end
    end
  end
end
