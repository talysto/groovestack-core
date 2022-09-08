module Core
  module Jobs
    module GraphQL
      class JobFilter < GraphQL::Schema::InputObject
        argument_class GraphQL::Schema::Argument

        description 'job filter props'
        argument :q, String, required: false
        argument :ids, [ID], required: false
        argument :status, String, required: false
      end
    end
  end
end