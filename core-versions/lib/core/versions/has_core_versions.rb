module Core
  module Versions
    module HasCoreVersions
      def has_core_versions(opts = {})
        has_paper_trail(opts)
      end
    end
  end
end

ActiveSupport.on_load(:active_record) do
  ActiveRecord::Base.send :extend, Core::Versions::HasCoreVersions
end
