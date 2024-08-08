# frozen_string_literal: true

require_relative "lib/core/activities/version"

Gem::Specification.new do |spec|
  spec.name = "core-activities"
  spec.version = Core::Activities::VERSION
  spec.authors = ["Max Schridde"]
  spec.email = ["maxjschridde@gmail.com"]

  spec.summary = "CORE extension for application activities"
  spec.description = "CORE extension for application activities"
  spec.post_install_message = 'CORE::Activities installed'
  spec.homepage = "https://github.com/talysto/groovestack-core"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["allowed_push_host"] = "TODO: Set to your gem server 'https://example.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/talysto/groovestack-core"
  spec.metadata["changelog_uri"] = "https://github.com/talysto/groovestack-core/core-activities"

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

  spec.add_dependency "dry-configurable"
  spec.add_dependency "wisper-activerecord"
  spec.add_dependency 'activerecord'
end
