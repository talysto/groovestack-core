# frozen_string_literal: true

# CORE Applications Template
# USAGE
# rails new -m https://raw.githubusercontent.com/moonlight-labs/core/main/support/core-rails-template.rb

# Reference: https://guides.rubyonrails.org/rails_application_templates.html

# starter command:
#  -d postgresql --skip-turbolinks --skip-jbuilder --skip-webpack-install

gem 'pg'
gem 'graphql'
gem 'uuid'
gem 'vite_rails'

# generate(:scaffold, "person name:string")
# route "root to: 'people#index'"
# rails_command("db:migrate")

# after_bundle do
#   git :init
#   git add: "."
#   git commit: %Q{ -m 'Initial commit' }
# end
