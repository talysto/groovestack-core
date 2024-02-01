class Identity < ActiveRecord::Base
  belongs_to :user

  def self.find_or_create_from_omniauth!(auth:, current_user: nil, user_attrs: {})
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |identity|
      # TODO 
      # possible cases
      # 1. user exists in the system (i.e. we found an email for them)
      # 2. user does not exist in the system (i.e. oauth email doesn't match anything in the system

      user = current_user || User.find_by(email: auth.info.email)
      user_attrs_to_assign = user_attrs[:priority] || {}

      if user.nil?
        user_attrs_to_assign = user_attrs_to_assign.merge(user_attrs[:defaults] || {})
        user = User.new
      end
      
      attrs = auth['info'].to_hash.slice(*user.attribute_names)
      user.assign_attributes(attrs.merge(user_attrs_to_assign))

      # user.skip_confirmation!
      user.save!

      identity.omniauth_data = auth
      identity.user = user
    end
  end
end