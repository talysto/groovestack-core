module Core
  module Comments
    module GraphQL
      module Comment
        module Types
          module Commentable
            # TODO: remove this proxy module when we remove the old commentable types

            include Core::Base::GraphQL::Helpers::Types::Typified
          end
        end
      end
    end
  end
end