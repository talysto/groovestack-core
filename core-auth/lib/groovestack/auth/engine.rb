# frozen_string_literal: true

require_relative 'provider'

if defined?(Rails::Engine)
  module Groovestack
    module Auth
      class Engine < ::Rails::Engine
        include ::Groovestack::Base::CoreRailtie

        def dx_validations
          [
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

        initializer :append_locales do |app|
          append_locales app
        end

        config.after_initialize do
          after_init
        end

        config.to_prepare do
          # Include Auth concerns after Rails is fully loaded to ensure Devise is loaded

          ::User.include ::Groovestack::Auth::User
          ::Identity.include ::Groovestack::Auth::Identity
        end
      end
    end
  end
end
