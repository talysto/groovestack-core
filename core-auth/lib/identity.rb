class Identity < ActiveRecord::Base
  belongs_to :user

  def self.find_or_create_from_omniauth!(auth:, current_user: nil, user_attrs: [])
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |identity|
      # TODO 
      # possible cases
      # 1. user exists in the system (i.e. we found an email for them)
      # 2. user does not exist in the system (i.e. oauth email doesn't match anything in the system

      unless (user = current_user || User.find_by(email: auth.info.email))
        user = User.new({
          name: auth.info.name, 
          email: auth.info.email,
        }.merge(user_attrs))

        # user.skip_confirmation!
        user.save!
      end

      identity.omniauth_data = auth
      identity.user = user
    end
  end
end
