# frozen_string_literal: true

require 'spec_helper'
require 'groovestack/config'

RSpec.describe Groovestack::Config::App do
  before do
    # Reset class variables before each test

    # rubocop:disable Style/ClassVars
    described_class.class_variable_set(:@@config, {})
    described_class.class_variable_set(:@@dynamic_config, [])
    # rubocop:enable Style/ClassVars
  end

  it 'has a version number' do
    expect(Groovestack::Config::VERSION).not_to be_nil
  end

  describe '.generate_config' do
    it 'returns an empty hash by default' do
      expect(described_class.generate_config).to eq({})
    end

    it 'generates dynamic config when present' do
      described_class.dynamic_config << { key: :hello, build: proc { 'world' } }
      expect(described_class.generate_config[:hello]).to eq('world')
    end
  end

  describe 'class variables' do
    it 'has an empty config class variable' do
      expect(described_class.class_variable_get(:@@config)).to eq({})
    end

    it 'has an empty dynamic_config class variable' do
      expect(described_class.dynamic_config).to eq([])
    end
  end

  describe '.dynamic_config' do
    it 'can add dynamic config entries' do
      expect(described_class.dynamic_config.size).to eq(0)
      described_class.dynamic_config << { key: :hello, build: proc { 'world' } }
      expect(described_class.dynamic_config.size).to eq(1)
    end
  end
end
