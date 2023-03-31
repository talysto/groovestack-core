module Core
  module Versions
    module HasCoreVersions
      def has_core_versions(opts = {})
        versions = {
          versions: {
            class_name: 'Core::Versions::Version'
          }
        }
        
        has_paper_trail opts.merge(versions)
      end
    end
  end
end

ActiveSupport.on_load(:active_record) do
  ActiveRecord::Base.send :extend, Core::Versions::HasCoreVersions
end
