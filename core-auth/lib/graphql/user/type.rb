module GraphQL
  module User
    class Type < ::Core::Base::GraphQL::Types::BaseObject
      include ::Core::Base::GraphQL::Helpers::Types::Typified
      
      description 'An user'

      field :created_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'created at'
      field :id, ID, null: false, description: 'id'
      field :updated_at, ::GraphQL::Types::ISO8601DateTime, null: false, description: 'updated at'

      field :email, String, null: true, description: 'email'
      field :name, String, null: true, description: 'name'
      field :roles, [String], null: true, description: 'roles'
      field :language, String, null: true, description: 'user language'
      field :image, String, null: true, description: 'user image url'
      field :has_email_provider, Boolean, null: true, description: 'user has email provider'

      # devise fields
      field :last_login_at, ::GraphQL::Types::ISO8601DateTime, null: true, description: 'last login in at', method: :last_sign_in_at
      field :sign_in_count, Integer, null: true, description: 'sign in count'
    
      field :identities, [::GraphQL::Identity::Type], null: false, description: 'identities'

      def has_email_provider
        object.has_email_provider?
      end
    end
  end
end