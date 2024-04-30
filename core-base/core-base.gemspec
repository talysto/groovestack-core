# frozen_string_literal: true

require_relative 'lib/core/base/version'

Gem::Specification.new do |spec|
  spec.name = 'core-base'
  spec.version = Core::Base::VERSION
  spec.authors = ['Darren Rush']
  spec.email = ['dlrush@gmail.com']

  spec.summary = 'Shared extensions for CORE modules'
  spec.description = 'CORE::Base defines reusable extensions for the CORE Platform.'
  spec.post_install_message = 'CORE::Base installed'

  spec.homepage = 'https://moonlight-labs.com/core/'
  spec.required_ruby_version = '>= 3.1.0'

  spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"

  spec.metadata['homepage_uri'] = spec.homepage
  spec.metadata['source_code_uri'] = 'https://moonlight-labs.com/core/'
  spec.metadata['changelog_uri'] = 'https://moonlight-labs.com/core/core-base#changelog'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  # spec.add_dependency 'activerecord', '~> 6.0'

  spec.add_dependency 'dry-configurable'
  spec.add_dependency 'graphql'
  spec.add_dependency 'pg'

  spec.add_development_dependency 'pg_lock'
  spec.add_development_dependency 'puma'

  spec.add_development_dependency 'activerecord'
  spec.add_development_dependency 'bugsnag', '~> 6.26'
  spec.add_development_dependency 'minitest', '~> 5.0'
  spec.add_development_dependency 'rake', '~> 12.0'

  # spec.add_development_dependency 'combustion', '~> 1.3' # for smaller test app
  # spec.add_development_dependency 'racksh'
  # spec.add_development_dependency 'sinatra-activerecord'

  spec.metadata['rubygems_mfa_required'] = 'true'
end
