module Core
  module Versions
    module HasCoreVersions
      def has_core_versions(opts = {})
        has_paper_trail versions: {
          class_name: 'Core::Versions::Version'
        }
      end
    end
  end
end
