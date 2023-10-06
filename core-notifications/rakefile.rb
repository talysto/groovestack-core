# frozen_string_literal: true

require 'bundler/gem_tasks'
require 'rake/testtask'

# require 'active_record/tasks/database_tasks'

# require 'sinatra/activerecord/rake'
# namespace :db do
#   task :load_config do
#     require './lib/core/jobs'
#   end
# end

Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  t.libs << 'lib'
  t.test_files = FileList['test/**/*_test.rb']
end

task default: :test
