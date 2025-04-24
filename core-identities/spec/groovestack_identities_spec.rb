# frozen_string_literal: true

RSpec.describe Groovestack::Identities do
  it 'has a version number' do
    expect(Groovestack::Identities::VERSION).not_to be_nil
  end

  describe 'autoloading' do
    # Test main modules
    %w[
      Groovestack::Identities
      GraphQL::Identity
      GraphQL::User
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test GraphQL Identity submodules
    %w[
      GraphQL::Identity::Type
      GraphQL::Identity::Filter
      GraphQL::Identity::Queries
      GraphQL::Identity::Mutations
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end

    # Test GraphQL User submodules
    %w[
      GraphQL::User::Type
      GraphQL::User::Filter
      GraphQL::User::Queries
      GraphQL::User::Mutations
    ].each do |const|
      it "autoloads #{const}" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end
  end

  describe 'models' do
    # Test that core models are loaded
    %w[
      User
      Identity
    ].each do |const|
      it "loads #{const} model" do
        expect { Object.const_get(const) }.not_to raise_error
      end
    end
  end
  
  describe 'fabricators' do
    it 'makes user fabricator available when Fabrication and Faker are defined' do      
      # Check that Fabrication is defined
      expect(defined?(Fabrication)).to be_truthy
      expect(defined?(Faker)).to be_truthy
      
      # Test that the user fabricator is defined without building a user
      expect(Fabrication.manager.schematics.keys).to include(:user)
      expect(Fabrication.manager.schematics.keys).to include(:user_with_email)
      expect(Fabrication.manager.schematics.keys).to include(:admin_user)
    end
  end
end
