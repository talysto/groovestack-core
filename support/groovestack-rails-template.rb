# frozen_string_literal: true

# CORE Applications Template
# USAGE
# rails new -m https://raw.githubusercontent.com/moonlight-labs/core/main/support/core-rails-template.rb

# Reference: https://guides.rubyonrails.org/rails_application_templates.html

# starter command:
#  -d postgresql --skip-turbolinks --skip-jbuilder --skip-webpack-install

# ARGV << "--skip-webpack-install"
# ARGV << "-d postgresql"

# puts ARGV
# exit
# puts self.class.protected_instance_methods(false).sort
# puts self.class.private_instance_methods(false).sort
# puts self.singleton_class.instance_methods(false).sort


# Groovestack Basics
gem 'graphql'
gem 'uuid'
gem 'vite_rails'

# Nice to haves for Rails apps
gem 'view_component'

# dev stuff
gem_group :development, :test do
  gem 'foreman'
end

# CORE Modules
# add_source 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do
# git 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do
github 'moonlight-labs/core', branch: 'dev' do
  gem 'core-base' # must be first dependency
  gem 'core-jobs'
  # gem 'core-comments'
  # gem 'core-versions'
  # gem 'core-notifications'
  # gem 'core-webhooks'
end

run "bundle install"

# git 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do # TODO: update branch name to main
#   gem 'core-base' # must be first dependency
#   gem 'core-comments'
#   gem 'core-referrals'
#   gem 'core-versions'
# end

# # gem 'groovestack-rails', github: 'talysto/groovestack-rails'

inject_into_file 'config/application.rb', :before => "  end" do
  "\n  config.active_record.schema_format = :sql\n\n"
end

inject_into_file 'app/controllers/application_controller.rb', :before => "  end" do
  "\n  def index; end\n\n"
end

create_file "app/frontend/entrypoints/application.js", <<~RUBY
// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

import '~/entrypoints/groovestack-admin.js'
// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

RUBY

create_file "app/views/application/index.html.erb", <<~RUBY
<header>
  <a href="https://vite-ruby.netlify.app/guide/rails.html">
    # <img class="logo smooth" src="<%= vite_asset_path 'images/logo.svg' %>"/>
    <div id="root"></div>
  </a>
</header>
RUBY

create_file "app/frontend/entrypoints/groovestack-admin.js", <<~RUBY
import React from 'react'

import { AdminApp } from '~/components/AdminApp.jsx'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

root.render(React.createElement(AdminApp))
RUBY

create_file "app/frontend/components/AdminApp.jsx", <<~RUBY
import React from 'react'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { Jobs } from '@moonlight-labs/core-jobs-fe'

export const AdminApp = () => {
  return (
    <Admin 
      dashboard={Jobs.Dashboard}
      dataProvider={simpleRestProvider('http://path.to.my.api')}>
      <Resource
        name="Job"
        icon={Jobs.Icon}
        edit={Jobs.Edit}
        list={Jobs.List}
        recordRepresentation={Jobs.resourceRepresentation}
      />
    </Admin>
  )
}
RUBY

# # Setup the DB
rails_command "db:create"
rails_command "db:migrate"


# # Configure Vite
# # https://vite-ruby.netlify.app/guide/
run "bundle exec vite install"

## Setup Frontend
# "@moonlight-labs/core-base-fe": "workspace:^",
# "@moonlight-labs/core-comments-fe": "workspace:^",
# "@moonlight-labs/core-jobs-fe": "workspace:^",
# "@moonlight-labs/core-notifications-fe": "workspace:^",
# "@moonlight-labs/core-versions-fe": "workspace:^",
# "@moonlight-labs/core-webhooks-fe": "workspace:^",
# "@mui/material": "^5.14.11",
# "ra-data-fakerest": "^4.12.1",
# "react": ">=18.0.0",
# "react-dom": ">=18.0.0"
run "npm add react react-dom react-admin @react-admin/ra-realtime ra-data-simple-rest @mui/material @moonlight-labs/core-jobs-fe"

# # generate(:scaffold, "person name:string")
# # route "root to: 'people#index'"
# # rails_command("db:migrate")

# # after_bundle do
# #   git :init
# #   git add: "."
# #   git commit: %Q{ -m 'Initial commit' }
# # end

after_bundle do
  inject_into_file "config/routes.rb", "  root to: 'application#index', as: :home\n", :before => /^end/

  puts "⚡️ Groovestack App Setup Complete"

  run "./bin/dev"
  # puts ARGV.inspect
end


# [--skip-namespace], [--no-skip-namespace]              # Skip namespace (affects only isolated engines)
# [--skip-collision-check], [--no-skip-collision-check]  # Skip collision check
# -r,          [--ruby=PATH]                                          # Path to the Ruby binary of your choice
#
# -m,          [--template=TEMPLATE]                                  # Path to some application template (can be a filesystem path or URL)
# -d,          [--database=DATABASE]                                  # Preconfigure for selected database (options: mysql/postgresql/sqlite3/oracle/sqlserver/jdbcmysql/jdbcsqlite3/jdbcpostgresql/jdbc)
#                                                        # Default: sqlite3
# [--skip-gemfile], [--no-skip-gemfile]                  # Don't create a Gemfile
# -G,          [--skip-git], [--no-skip-git]                          # Skip .gitignore file
# [--skip-keeps], [--no-skip-keeps]                      # Skip source control .keep files
# -M,          [--skip-action-mailer], [--no-skip-action-mailer]      # Skip Action Mailer files
# [--skip-action-mailbox], [--no-skip-action-mailbox]    # Skip Action Mailbox gem
# [--skip-action-text], [--no-skip-action-text]          # Skip Action Text gem
# -O,          [--skip-active-record], [--no-skip-active-record]      # Skip Active Record files
# [--skip-active-job], [--no-skip-active-job]            # Skip Active Job
# [--skip-active-storage], [--no-skip-active-storage]    # Skip Active Storage files
# -P,          [--skip-puma], [--no-skip-puma]                        # Skip Puma related files
# -C,          [--skip-action-cable], [--no-skip-action-cable]        # Skip Action Cable files
# -S,          [--skip-sprockets], [--no-skip-sprockets]              # Skip Sprockets files
# [--skip-spring], [--no-skip-spring]                    # Don't install Spring application preloader
# [--skip-listen], [--no-skip-listen]                    # Don't generate configuration that depends on the listen gem
# -J,          [--skip-javascript], [--no-skip-javascript]            # Skip JavaScript files
# [--skip-turbolinks], [--no-skip-turbolinks]            # Skip turbolinks gem
# [--skip-jbuilder], [--no-skip-jbuilder]                # Skip jbuilder gem
# -T,          [--skip-test], [--no-skip-test]                        # Skip test files
# [--skip-system-test], [--no-skip-system-test]          # Skip system test files
# [--skip-bootsnap], [--no-skip-bootsnap]                # Skip bootsnap gem
# [--dev], [--no-dev]                                    # Set up the application with Gemfile pointing to your Rails checkout
# [--edge], [--no-edge]                                  # Set up the application with Gemfile pointing to Rails repository
# [--master], [--no-master]                              # Set up the application with Gemfile pointing to Rails repository main branch
# [--rc=RC]                                              # Path to file containing extra configuration options for rails command
# [--no-rc], [--no-no-rc]                                # Skip loading of extra configuration options from .railsrc file
# [--api], [--no-api]                                    # Preconfigure smaller stack for API only apps
# [--minimal], [--no-minimal]                            # Preconfigure a minimal rails app
# -B,          [--skip-bundle], [--no-skip-bundle]                    # Don't run bundle install
# --webpacker, [--webpack=WEBPACK]                                    # Preconfigure Webpack with a particular framework (options: react, vue, angular, elm, stimulus)
# [--skip-webpack-install], [--no-skip-webpack-install]  # Don't run Webpack install
