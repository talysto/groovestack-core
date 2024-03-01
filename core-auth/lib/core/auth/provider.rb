module Core
  module Auth 
    def self.available_providers(ancestor: nil)
      # ensure all providers are loaded
      ::Core::Auth::Providers.eager_load!

      root = ancestor || ::Core::Auth::Provider

      root.descendants.select(&:available?)
    end

    def self.enabled_providers(ancestor: nil)
      available_providers(ancestor: ancestor).select(&:enabled?)
    end

    def self.configured_providers(ancestor: nil)
      enabled_providers(ancestor: ancestor).select(&:configured?)
    end

    def self.enabled_providers_sans_configuration(ancestor: nil)
      enabled_providers(ancestor: ancestor) - configured_providers(ancestor: ancestor)
    end

    class Provider 
      def self.provider
        self.const_defined?(:PROVIDER) ? self::PROVIDER : nil
      end

      def self.k
        self.const_defined?(:K) ? self::K : provider
      end

      def self.available?
        provider.present?
      end

      def self.enabled?
        available? && ::Core::Auth.disabled_providers.exclude?(provider)
      end

      def self.configured?
        false
      end

      def self.as_json(keys=nil)
        verbose = {
          provider: provider,
          k: k || provider,
        }

        return verbose if keys.nil?

        verbose.select { |k, v| keys.include?(k) }
      end
    end
  end
end