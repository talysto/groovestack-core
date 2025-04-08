# frozen_string_literal: true

require_relative 'lib/groovestack/base/version'

Gem::Specification.new do |spec|
  spec.name = 'groovestack-base'
  spec.version = Groovestack::Base::VERSION
  spec.authors = ['Darren Rush']
  spec.email = ['dlrush@gmail.com']

  spec.summary = 'Shared extensions for CORE modules'
  spec.description = 'Groovestack::Base defines reusable extensions for the CORE Platform.'
  spec.post_install_message = 'Groovestack::Base installed'

  spec.homepage = 'https://github.com/talysto/groovestack-core/'
  spec.required_ruby_version = '>= 3.1.0'

  spec.metadata['allowed_push_host'] = 'https://rubygems.org'

  spec.metadata['homepage_uri'] = spec.homepage
  spec.metadata['source_code_uri'] = 'https://github.com/talysto/groovestack-core/'
  spec.metadata['changelog_uri'] = 'https://github.com/talysto/groovestack-core/'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'activerecord', '~> 7.0'
  spec.add_dependency 'dry-configurable', '~> 1.0'
  spec.add_dependency 'graphql', '>= 1.8', '< 2.4' # TODO: bump once graphql_devise is updated in groovestack-auth
  spec.add_dependency 'pg', '~> 1.0'
  spec.add_dependency 'pg_lock', '~> 1.0'
  spec.add_dependency 'puma', '~> 5.0'

  spec.metadata['rubygems_mfa_required'] = 'true'
end
