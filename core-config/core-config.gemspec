# frozen_string_literal: true

require_relative "lib/core/config/version"

Gem::Specification.new do |spec|
  spec.name = "core-config"
  spec.version = Core::Config::VERSION
  spec.authors = ["Max Schridde"]
  spec.email = ["maxjschridde@gmail.com"]

  spec.summary = "CORE extension for application config"
  spec.description = "CORE::Config is a config extension for the CORE Platform."
  spec.post_install_message = "CORE::Config installed"

  spec.homepage = "https://talysto.com/core"
  spec.required_ruby_version = ">= 3.1.3"

  spec.metadata["allowed_push_host"] = "TODO: Set to your gem server 'https://example.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://talysto.com/core"
  spec.metadata["changelog_uri"] = "https://talysto.com/core/core-config#changelog"

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

  # Uncomment to register a new dependency of your gem
  # spec.add_dependency "example-gem", "~> 1.0"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
