# frozen_string_literal: true

require 'spec_helper'
require 'groovestack/auth'

RSpec.describe Groovestack::Auth do
  it 'has a version number' do
    expect(Groovestack::Auth::VERSION).not_to be_nil
  end

  describe 'autoloading' do
    # Test main modules for both namespaces
    %w[
      Groovestack::Auth::Provider
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test Providers submodules for both namespaces
    %w[
      Groovestack::Auth::Providers
      Groovestack::Auth::Providers::Email
      Groovestack::Auth::Providers::OmniAuth
      Groovestack::Auth::Providers::Apple
      Groovestack::Auth::Providers::Google
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end
  end

  describe 'configuration' do
    [Groovestack::Auth].each do |auth|
      it 'has configurable disabled_providers setting' do
        expect(auth.config).to respond_to(:disabled_providers)
        expect(auth.config.disabled_providers).to eq([])
      end
    end
  end
end
