# frozen_string_literal: true

RSpec.describe Groovestack::Base do
  it 'has a version number' do
    expect(Groovestack::Base::VERSION).not_to be_nil
  end

  describe 'autoloading' do
    # Test main modules for both namespaces
    %w[
      Core::Base::GraphQL
      Core::Base::ActiveRecord
      Core::Base::Listener
      Core::Base::Listeners
      Core::Base::PubSub
      Core::Base::CoreRailtie
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
      Core::Base::GraphQL::Providers
      Core::Base::GraphQL::Tracers
      Groovestack::Base::GraphQL::Base
      Groovestack::Base::GraphQL::Controllers
      Groovestack::Base::GraphQL::Documentation
      Groovestack::Base::GraphQL::Mutations
      Groovestack::Base::GraphQL::Providers
      Groovestack::Base::GraphQL::Subscriptions
      Groovestack::Base::GraphQL::Types
      Groovestack::Base::GraphQL::Tracers
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test nested modules for both namespaces
    %w[
      Core::Base::GraphQL::Subscriptions::EventHandler
      Core::Base::GraphQL::Types::BaseArgument
      Core::Base::GraphQL::Types::BaseField
      Core::Base::GraphQL::Types::BaseObject
      Core::Base::GraphQL::Types::AuthorizedBaseField
      Core::Base::GraphQL::Types::AuthorizedBaseObject
      Core::Base::GraphQL::Types::VisibleBaseField
      Core::Base::GraphQL::BaseInputObject
      Core::Base::GraphQL::BaseMutation
      Core::Base::GraphQL::Documentation::Arguments
      Core::Base::GraphQL::Documentation::Fields
      Core::Base::GraphQL::Helpers::Types::StatusEventVirtualAttributes
      Core::Base::GraphQL::Helpers::Types::Typified
      Core::Base::GraphQL::Helpers::Mutations::StatusEvents
      Core::Base::GraphQL::Helpers::Mutations::InstanceMethods
      Core::Base::GraphQL::Helpers::Controller
      Core::Base::GraphQL::Providers::ReactAdmin::Resource
      Core::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata
      Core::Base::GraphQL::Tracers::AtomicMultiplexTransaction
      Groovestack::Base::GraphQL::Authorization::AuthorizedField
      Groovestack::Base::GraphQL::Authorization::AuthorizedObject
      Groovestack::Base::GraphQL::Authorization::VisibleField
      Groovestack::Base::GraphQL::Base::Argument
      Groovestack::Base::GraphQL::Base::Field
      Groovestack::Base::GraphQL::Base::InputObject
      Groovestack::Base::GraphQL::Base::Mutation
      Groovestack::Base::GraphQL::Base::Object
      Groovestack::Base::GraphQL::Base::Subscription
      Groovestack::Base::GraphQL::Controllers::GraphQLController
      Groovestack::Base::GraphQL::Documentation::Arguments
      Groovestack::Base::GraphQL::Documentation::Fields
      Groovestack::Base::GraphQL::Mutations::AASMEventTrigger
      Groovestack::Base::GraphQL::Mutations::MethodTrigger
      Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource
      Groovestack::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata
      Groovestack::Base::GraphQL::Subscriptions::Trigger
      Groovestack::Base::GraphQL::Types::AASMEventAttributes
      Groovestack::Base::GraphQL::Types::Currency
      Groovestack::Base::GraphQL::Types::Money
      Groovestack::Base::GraphQL::Types::SubscriptionPayload
      Groovestack::Base::GraphQL::Types::TypeResolver
      Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test that Core::Base aliases point to Groovestack::Base
    describe 'Core::Base aliases' do
      it 'aliases GraphQL modules correctly' do
        expect(Core::Base::GraphQL::Subscriptions::EventHandler).to eq(Groovestack::Base::GraphQL::Subscriptions::Trigger)
        expect(Core::Base::GraphQL::Types::BaseArgument).to eq(Groovestack::Base::GraphQL::Base::Argument)
        expect(Core::Base::GraphQL::Types::BaseField).to eq(Groovestack::Base::GraphQL::Base::Field)
        expect(Core::Base::GraphQL::Types::BaseObject).to eq(Groovestack::Base::GraphQL::Base::Object)
        expect(Core::Base::GraphQL::Types::AuthorizedBaseField).to eq(Groovestack::Base::GraphQL::Authorization::AuthorizedField)
        expect(Core::Base::GraphQL::Types::AuthorizedBaseObject).to eq(Groovestack::Base::GraphQL::Authorization::AuthorizedObject)
        expect(Core::Base::GraphQL::Types::VisibleBaseField).to eq(Groovestack::Base::GraphQL::Authorization::VisibleField)
        expect(Core::Base::GraphQL::BaseInputObject).to eq(Groovestack::Base::GraphQL::Base::InputObject)
        expect(Core::Base::GraphQL::BaseMutation).to eq(Groovestack::Base::GraphQL::Base::Mutation)
        expect(Core::Base::GraphQL::Documentation::Arguments).to eq(Groovestack::Base::GraphQL::Documentation::Arguments)
        expect(Core::Base::GraphQL::Documentation::Fields).to eq(Groovestack::Base::GraphQL::Documentation::Fields)
        expect(Core::Base::GraphQL::BaseSubscription).to eq(Groovestack::Base::GraphQL::Base::Subscription)
        expect(Core::Base::GraphQL::Helpers::Types::StatusEventVirtualAttributes).to eq(Groovestack::Base::GraphQL::Types::AASMEventAttributes)
        expect(Core::Base::GraphQL::Helpers::Types::Typified).to eq(Groovestack::Base::GraphQL::Types::TypeResolver)
        expect(Core::Base::GraphQL::Helpers::Mutations::StatusEvents).to eq(Groovestack::Base::GraphQL::Mutations::AASMEventTrigger)
        expect(Core::Base::GraphQL::Helpers::Mutations::InstanceMethods).to eq(Groovestack::Base::GraphQL::Mutations::MethodTrigger)
        expect(Core::Base::GraphQL::Helpers::Controller).to eq(Groovestack::Base::GraphQL::Controllers::GraphQLController)
        expect(Core::Base::GraphQL::Providers::ReactAdmin::Resource).to eq(Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource)
        expect(Core::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata).to eq(Groovestack::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata)
        expect(Core::Base::GraphQL::Tracers::AtomicMultiplexTransaction).to eq(Groovestack::Base::GraphQL::Tracers::AtomicMultiplexTransaction)
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
