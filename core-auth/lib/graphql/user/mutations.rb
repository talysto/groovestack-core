# frozen_string_literal: true

module GraphQL
  module User
    module Mutations
      class Update < ::Core::Base::GraphQL::BaseMutation
        argument :id, ID, required: true
        argument :email, String, required: false
        argument :name, String, required: false
        argument :current_password, String, required: false
        argument :password, String, required: false
        argument :roles, [String], required: false
        argument :language, String, required: false
        argument :image, String, required: false
        
        type ::GraphQL::User::Type
  
        def current_user
          context[:current_resource]
        end
  
        def perform(id:, **attrs)
          obj = id == current_user&.id ? current_user : ::User.find(id)
  
          return update_with_password!(obj, **attrs) if (attrs.keys & [:password, :current_password]).present?
          
          raise GraphQL::ExecutionError, 'Validation Failed: only admins can update user roles' if !current_user.admin? && attrs[:roles].present?
          
          obj.update!(attrs)
  
          obj
        end
  
        def update_with_password!(user, **attrs)
          raise GraphQL::ExecutionError, 'Validation Failed: user can only update their own password' unless current_user&.id == user.id
  
          ::User.transaction do
            user.password = attrs[:current_password] = attrs[:password] unless user.has_email_provider? # if password isn't set yet, allow them to set it
            
            raise GraphQL::ExecutionError, user.errors.full_messages.join(' ') unless user.update_with_password(attrs)
  
            context[:bypass_sign_in].call user.reload, scope: :user
          end
  
          user
        end
      end

      extend ActiveSupport::Concern

      included do
        field :update_user, mutation: ::GraphQL::User::Mutations::Update, description: 'update user'
      end
    end
  end
end
