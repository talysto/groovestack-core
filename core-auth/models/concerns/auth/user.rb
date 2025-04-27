module Auth
  module User
    extend ActiveSupport::Concern
    
    included do
      extend ::Devise::Models
  
      devise :database_authenticatable, :registerable,
              :recoverable, :rememberable, :trackable, :validatable,
              :confirmable, :lockable, :timeoutable
    end
  end
end