# frozen_string_literal: true

require_relative 'lib/groovestack/auth/version'

Gem::Specification.new do |spec|
  spec.name = 'groovestack-auth'
  spec.version = Groovestack::Auth::VERSION
  spec.authors = ['Max Schridde']
  spec.email = ['maxjschridde@gmail.com']

  spec.summary = 'Groovestack extension for application authentication'
  spec.description = 'Groovestack::Auth is an authentication extension for the Groovestack Platform.'
  spec.post_install_message = 'Groovestack::Auth installed'

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

  spec.add_dependency 'groovestack-base', '~> 0.1', '>= 0.1.7'
  spec.add_dependency 'groovestack-config', '~> 0.1', '>= 0.1.1'
  spec.add_dependency 'jsonb_accessor', '~>1.4'

  # spec.add_development_dependency 'graphql_devise'
  spec.add_dependency 'omniauth-apple'
  spec.add_dependency 'omniauth-google-oauth2'

  spec.metadata['rubygems_mfa_required'] = 'true'
end
