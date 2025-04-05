# frozen_string_literal: true

require 'spec_helper'
require 'core/base'

RSpec.describe Core::Base do
  it 'has a version number' do
    expect(Core::Base::VERSION).not_to be_nil
  end

  describe 'autoloading' do
    # Test main modules
    %w[
      Core::Base::GraphQL
      Core::Base::ActiveRecord
      Core::Base::Listeners
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test GraphQL submodules
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
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test nested modules
    %w[
      Core::Base::GraphQL::Subscriptions::EventHandler
      Core::Base::GraphQL::Tracers::AtomicMultiplexTransaction
      Core::Base::GraphQL::Providers::ReactAdmin::Resource
      Core::Base::GraphQL::Providers::ReactAdmin::Types
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end
  end

  describe 'configuration' do
    it 'has configurable error notifier' do
      expect(described_class.config.error_notifier).to respond_to(:handler)
      expect(described_class.config.error_notifier).to respond_to(:notify_method)
    end

    it 'has configurable graphql settings' do
      expect(described_class.config.graphql).to respond_to(:camelize)
    end

    it 'has default error monitor' do
      expect(described_class::DEFAULT_ERROR_MONITOR).to be_a(Logger)
    end
  end
end
