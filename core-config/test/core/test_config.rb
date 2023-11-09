# frozen_string_literal: true

require "test_helper"

# rubocop:disable Rails/RefuteMethods

module Core
  class TestConfig < Minitest::Test
    def setup
      # set class variable defaults
      Core::Config::App.class_variable_set(:@@config, {})
      Core::Config::App.class_variable_set(:@@dynamic_config, [])
    end

    def test_that_it_has_a_version_number
      refute_nil ::Core::Config::VERSION
    end

    def test_generate_config
      config = Core::Config::App.generate_config
      assert_equal config, {}
    end

    def test_has_dconfig_class_variable
      assert_equal Core::Config::App.class_variable_get(:@@config), {}
    end

    def test_has_dynamic_config_class_variable
      assert_equal Core::Config::App.dynamic_config, []
    end

    def test_can_add_dynamic_config
      assert_equal Core::Config::App.dynamic_config.size, 0
      Core::Config::App.dynamic_config << { key: :hello, build: Proc.new { 'world' } }
      assert_equal Core::Config::App.dynamic_config.size, 1
    end

    def test_generate_dynamic_config
      Core::Config::App.dynamic_config << { key: :hello, build: Proc.new { 'world' } }
      config = Core::Config::App.generate_config
      assert_equal config[:hello], 'world'
    end
  end
end

# rubocop:enable Rails/RefuteMethods
