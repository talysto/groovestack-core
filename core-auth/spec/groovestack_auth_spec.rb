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
      Core::Auth::Provider
      Groovestack::Auth::Provider
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test Providers submodules for both namespaces
    %w[
      Core::Auth::Providers
      Core::Auth::Providers::Email
      Core::Auth::Providers::OmniAuth
      Core::Auth::Providers::Apple
      Core::Auth::Providers::Google
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

    # Test that Core::Auth aliases point to Groovestack::Auth
    describe 'Core::Auth aliases' do
      it 'aliases main modules correctly' do
        expect(Core::Auth::Provider).to eq(Groovestack::Auth::Provider)
      end

      it 'aliases Providers modules correctly' do
        expect(Core::Auth::Providers::Email).to eq(Groovestack::Auth::Providers::Email)
        expect(Core::Auth::Providers::OmniAuth).to eq(Groovestack::Auth::Providers::OmniAuth)
        expect(Core::Auth::Providers::Apple).to eq(Groovestack::Auth::Providers::Apple)
        expect(Core::Auth::Providers::Google).to eq(Groovestack::Auth::Providers::Google)
      end
    end
  end

  describe 'configuration' do
    [Groovestack::Auth, Core::Auth].each do |auth|
      it 'has configurable disabled_providers setting' do
        expect(auth.config).to respond_to(:disabled_providers)
        expect(auth.config.disabled_providers).to eq([])
      end
    end
  end
end
