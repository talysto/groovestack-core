#!/bin/bash

# Show versions
# https://stackoverflow.com/questions/58752565/shell-bash-verifying-build-tools-and-enforcing-versions
ruby -v
rails -v


#  TODO
# try --api (does vite still build?)
rails new $1 -d postgresql --skip-turbolinks --skip-hotwire --skip-jbuilder --skip-webpack-install -c sass -m groovestack-rails-template.rb

# echo "⚡️ Groovestack App Setup Complete"

cd $1
