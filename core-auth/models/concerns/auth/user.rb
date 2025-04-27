module Auth
  module User
    extend ActiveSupport::Concern
    
    included do  
      # Include default devise modules.
      devise(*Groovestack::Auth.devise_modules)
    end
  end
end
