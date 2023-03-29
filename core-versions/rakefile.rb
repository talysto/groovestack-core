require 'bundler/gem_tasks'
require 'rake/testtask'

# require "sinatra/activerecord/rake"

namespace :db do
  task :load_config do
    require "lib/core/versions"
  end
end