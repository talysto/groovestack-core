module Core
  module Auth 
    module ActionCable
      module Connection
        extend ActiveSupport::Concern

        included do 
          identified_by :current_resource
        end

        def connect      
          self.current_resource = find_verified_resource    
        end     
    
        private 
    
        def find_verified_resource
          if (verified_user = env['warden'].user)
            verified_user
          else
            reject_unauthorized_connection
          end
        end
      end
    end
  end
end