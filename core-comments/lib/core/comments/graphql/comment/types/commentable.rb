module Core
  module Comments
    module GraphQL
      module Comment
        module Types
          module Commentable
            # TODO: potentially move this into core base and generalize

            extend ActiveSupport::Concern

            included do
              field :type, String, null: true, resolver_method: :object_type

              def object_type
                object.class.to_s if object.respond_to?(:class)
              end
            end
          end
        end
      end
    end
  end
end