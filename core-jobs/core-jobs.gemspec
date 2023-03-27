# frozen_string_literal: true

require_relative 'lib/core/jobs/version'

Gem::Specification.new do |spec|
  spec.name = 'core-jobs'
  spec.version = Core::Jobs::VERSION
  spec.authors = ['Darren Rush']
  spec.email = ['dlrush@gmail.com']

  spec.summary = 'CORE extension for full-stack background job management'
  spec.description = 'CORE::Jobs is a high-performance background-job processing extension for the CORE Platform.'
  spec.post_install_message = 'CORE::Jobs installed'

  spec.homepage = 'https://moonlight-labs.com/core/'
  spec.required_ruby_version = Gem::Requirement.new('3.1.3')

  spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"

  spec.metadata['homepage_uri'] = spec.homepage
  spec.metadata['source_code_uri'] = 'https://moonlight-labs.com/core/'
  spec.metadata['changelog_uri'] = 'https://moonlight-labs.com/core/core-jobs#changelog'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  # spec.add_dependency 'activerecord', '~> 6.0'
  spec.add_dependency 'puma'
  spec.add_dependency 'que', '~> 2.0.0.beta1'

  spec.add_development_dependency 'graphql'
  spec.add_development_dependency 'pg'

  spec.add_development_dependency 'combustion', '~> 1.3'  # Test engines without a full 'dummy' app https://github.com/pat/combustion
  spec.add_development_dependency 'racksh'                # get a console without a full Rails application
  spec.add_development_dependency 'sinatra-activerecord'  # ActiveRecord without rails

  spec.metadata['rubygems_mfa_required'] = 'true'
end
