# frozen_string_literal: true

require_relative "lib/core/referrals/version"

Gem::Specification.new do |spec|
  spec.name = "core-referrals"
  spec.version = Core::Referrals::VERSION
  spec.authors = ["Max Schridde"]
  spec.email = ["maxjschridde@gmail.com"]

  spec.summary = "CORE module to handle referrals"
  spec.description = "CORE module to handle referrals"
  spec.homepage = "https://github.com/talysto/groovestack-core"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["allowed_push_host"] = "TODO: Set to your gem server 'https://example.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/talysto/groovestack-core"
  spec.metadata["changelog_uri"] = "https://github.com/talysto/groovestack-core/core-referrals"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (File.expand_path(f) == __FILE__) ||
        f.start_with?(*%w[bin/ test/ spec/ features/ .git .circleci appveyor Gemfile])
    end
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency 'base32h'
  spec.add_dependency 'sinatra-activerecord'
  spec.add_dependency 'activerecord', '~> 6.1.7' # TODO remove. pinned active record at 6 for TOTEM use but should be 7 which is sinatra-activerecord's default

  # spec.add_development_dependency 'combustion', '~> 1.3' # for smaller test app
  # spec.add_development_dependency 'racksh'

  spec.metadata['rubygems_mfa_required'] = 'true'
end
