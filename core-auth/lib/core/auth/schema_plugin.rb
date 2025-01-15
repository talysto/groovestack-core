module Core
  module Auth 
    module SchemaPlugin 
      extend ActiveSupport::Concern

      included do 
        # use GraphqlDevise::SchemaPlugin.new(
        #   query:            Types::QueryType,
        #   mutation:         Types::MutationType,
        #   resource_loaders: [
        #     GraphqlDevise::ResourceLoader.new(User)
        #   ]
        # )
      end
    end
  end
end