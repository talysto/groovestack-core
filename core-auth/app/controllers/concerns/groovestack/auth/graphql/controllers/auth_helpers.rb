module Groovestack
  module Auth
    module GraphQL
      module Controllers
        module AuthHelpers
          extend ActiveSupport::Concern
          
          included do
            include Pundit::Authorization if defined?(::Pundit)
      
            before_action :authenticate_request!, unless: :graphiql?
      
            private
            
            def context        
              context = {
                visibility_profile: visibility_profile,
                current_user: current_user
              }.tap do |ctx|
                ctx[:authorize] = method(:authorize) if defined?(::Pundit)
              end
      
              context
            end
      
            def graphiql?
              return false unless defined?(::GraphiQL)

              Rails.env.development? && request.referer == ::Rails.application.routes.url_helpers.graphiql_rails_url
            end
      
            def graphiql_visibility_profile
              @graphiql_visibility_profile ||= request.headers['HTTP_GRAPHIQL_VISIBILITY_PROFILE']
            end
            
            def visibility_profile
              @visibility_profile ||= begin
                if graphiql?
                  raise 'must set GRAPHIQL_VISIBILITY_PROFILE header in graphiql initializer ' unless graphiql_visibility_profile.present?
                  graphiql_visibility_profile.to_sym
                elsif current_user.nil?
                  :anon
                elsif current_user.admin?
                  ::User::Role::ADMIN.to_sym
                elsif current_user.exec?
                  ::User::Role::EXEC.to_sym
                elsif current_user.staff?
                  ::User::Role::STAFF.to_sym
                else
                  :user
                end
              end
            end
      
            def authenticate_request!
              # skip authentication for AppConfig queries
              # introspection query is public. fields will be visible/not based on visibility_profile
      
              return if ['AppConfig', 'IntrospectionQuery'].include?(operation_name)
      
              authenticate_user!
            end
          end
        end
      end
    end
  end
end