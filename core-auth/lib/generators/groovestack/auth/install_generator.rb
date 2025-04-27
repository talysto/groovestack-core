require "psych"
require "rails/generators"
require "yaml"

module Groovestack
  module Auth
    module Generators
      class InstallGenerator < ::Rails::Generators::Base
        desc "Creates default install and config files for Groovestack::Auth"

        def copy_locale
          copy_file "./devise.en.yml", "config/locales/devise.en.yml"
        end
      end
    end
  end
end