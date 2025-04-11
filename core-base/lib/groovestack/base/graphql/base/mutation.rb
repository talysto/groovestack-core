# frozen_string_literal: true

module Groovestack
  module Base
    module GraphQL
      module Base
        class Mutation < ::GraphQL::Schema::Mutation
          argument_class ::Groovestack::Base::GraphQL::Base::Argument

          def resolve(**args)
            perform(**args)
          rescue StandardError => e
            Groovestack::Base.notify_error(self.class, e)

            raise e
          end

          def perform(**args)
            raise NotImplementedError
          end
        end
      end
    end
  end
end
