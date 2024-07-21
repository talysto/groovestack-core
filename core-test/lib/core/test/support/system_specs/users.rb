module SystemSpecs
  module LoginFlow
    def login_user(email:, password:)
      visit '/'
      fill_in 'Email', with: email
      fill_in 'Password', with: password
      
      within("div[role='tabpanel']") do
        click_button 'Login'
      end
    end
  end
end