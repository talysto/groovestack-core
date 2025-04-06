# frozen_string_literal: true

require 'spec_helper'
require 'groovestack/base'

RSpec.describe Groovestack::Base do
  it 'has a version number' do
    expect(Groovestack::Base::VERSION).not_to be_nil
  end

  describe 'autoloading' do
    # Test main modules for both namespaces
    %w[
      Core::Base::GraphQL
      Core::Base::ActiveRecord
      Core::Base::Listeners
      Groovestack::Base::GraphQL
      Groovestack::Base::ActiveRecord
      Groovestack::Base::Listeners
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test GraphQL submodules for both namespaces
    %w[
      Core::Base::GraphQL::Subscriptions
      Core::Base::GraphQL::Types
      Core::Base::GraphQL::BaseInputObject
      Core::Base::GraphQL::BaseMutation
      Core::Base::GraphQL::Documentation
      Core::Base::GraphQL::BaseSubscription
      Core::Base::GraphQL::Helpers
      Core::Base::GraphQL::Tracers
      Core::Base::GraphQL::Providers
      Groovestack::Base::GraphQL::Subscriptions
      Groovestack::Base::GraphQL::Types
      Groovestack::Base::GraphQL::BaseInputObject
      Groovestack::Base::GraphQL::BaseMutation
      Groovestack::Base::GraphQL::Documentation
      Groovestack::Base::GraphQL::BaseSubscription
      Groovestack::Base::GraphQL::Helpers
      Groovestack::Base::GraphQL::Tracers
      Groovestack::Base::GraphQL::Providers
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test nested modules for both namespaces
    %w[
      Core::Base::GraphQL::Subscriptions::EventHandler
      Core::Base::GraphQL::Tracers::AtomicMultiplexTransaction
      Core::Base::GraphQL::Providers::ReactAdmin::Resource
      Core::Base::GraphQL::Providers::ReactAdmin::Types
      Groovestack::Base::GraphQL::Subscriptions::EventHandler
      Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction
      Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource
      Groovestack::Base::GraphQL::Providers::ReactAdmin::Types
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test that Core::Base aliases point to Groovestack::Base
    describe 'Core::Base aliases' do
      it 'aliases GraphQL modules correctly' do
        expect(Core::Base::GraphQL::Subscriptions::EventHandler).to eq(Groovestack::Base::GraphQL::Subscriptions::EventHandler)
        expect(Core::Base::GraphQL::Types).to eq(Groovestack::Base::GraphQL::Types)
        expect(Core::Base::GraphQL::BaseInputObject).to eq(Groovestack::Base::GraphQL::BaseInputObject)
        expect(Core::Base::GraphQL::BaseMutation).to eq(Groovestack::Base::GraphQL::BaseMutation)
        expect(Core::Base::GraphQL::Documentation).to eq(Groovestack::Base::GraphQL::Documentation)
        expect(Core::Base::GraphQL::BaseSubscription).to eq(Groovestack::Base::GraphQL::BaseSubscription)
        expect(Core::Base::GraphQL::Helpers).to eq(Groovestack::Base::GraphQL::Helpers)
        expect(Core::Base::GraphQL::Tracers::AtomicMultiplexTransaction).to eq(Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction)
        expect(Core::Base::GraphQL::Providers::ReactAdmin::Resource).to eq(Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource)
        expect(Core::Base::GraphQL::Providers::ReactAdmin::Types).to eq(Groovestack::Base::GraphQL::Providers::ReactAdmin::Types)
      end

      it 'aliases ActiveRecord and Listeners correctly' do
        expect(Core::Base::ActiveRecord).to eq(Groovestack::Base::ActiveRecord)
        expect(Core::Base::Listener).to eq(Groovestack::Base::Listener)
        expect(Core::Base::Listeners).to eq(Groovestack::Base::Listeners)
      end

      it 'aliases error classes correctly' do
        expect(Core::Base::Error).to eq(Groovestack::Base::Error)
        expect(Core::Base::WrongSchemaFormat).to eq(Groovestack::Base::WrongSchemaFormat)
      end
    end
  end

  describe 'configuration' do
    [Groovestack::Base, Core::Base].each do |base|
      it 'has configurable error notifier' do
        expect(base.config.error_notifier).to respond_to(:handler)
        expect(base.config.error_notifier).to respond_to(:notify_method)
      end

      it 'has configurable graphql settings' do
        expect(base.config.graphql).to respond_to(:camelize)
      end

      it 'has default error monitor' do
        expect(base::DEFAULT_ERROR_MONITOR).to be_a(Logger)
      end
    end
  end
end
