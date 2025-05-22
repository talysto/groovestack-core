# frozen_string_literal: true

RSpec.describe Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource do
  let(:test_class) do
    Class.new(Groovestack::Base::GraphQL::Base::Object) do
      include Groovestack::Base::GraphQL::Providers::ReactAdmin::Resource
      graphql_name 'Test'
    end
  end

  let(:entity) { 'tests' }
  let(:entity_class) { double('Test') }
  resolver_methods = {
    find: :Test,
    collection: :tests,
    collection_meta: :tests_meta
  }

  fields = {
    find: :Test,
    collection: :all_tests,
    collection_meta: :_all_tests_meta
  }

  let(:entity_type) do
    Class.new(Groovestack::Base::GraphQL::Base::Object) do
      graphql_name 'TestType'
    end
  end
  let(:entity_filter_type) do
    Class.new(Groovestack::Base::GraphQL::Base::InputObject) do
      graphql_name 'TestFilter'
    end
  end
  let(:base_scope) { double('BaseScope') }
  let(:scope) { double('Scope') }
  let(:show_scope) { double('ShowScope') }
  let(:show_scope_class) { double('ShowScopeClass') }
  let(:index_scope) { double('IndexScope') }
  let(:index_scope_class) { double('IndexScopeClass') }
  let(:offset_scope) { double('OffsetScope') }
  let(:policy_class) do
    Class.new.tap do |klass|
      klass.const_set(:ShowScope, show_scope_class)
      klass.const_set(:IndexScope, index_scope_class)
    end
  end

  let(:policy) { policy_class.to_s }
  let(:current_user) { double('Test') }
  let(:context) { { current_user: current_user } }
  let(:schema) { double('Schema', visibility_profile_for_context: []) }
  let(:query) { double('Query', schema: schema) }
  let(:graphql_context) { GraphQL::Query::Context.new(query: query, values: context) }

  before do
    # Stub constantize for strings
    allow_any_instance_of(String).to receive(:constantize) do |str|
      case str
      when entity_class.to_s
        entity_class
      when entity_type.to_s
        entity_type
      when entity_filter_type.to_s
        entity_filter_type
      when policy
        policy_class
      else
        str.constantize
      end
    end

    # Stub unscoped on the base scopes
    allow(entity_class).to receive(:unscoped).and_return(base_scope)

    allow(base_scope).to receive(:offset).and_return(offset_scope)
    allow(offset_scope).to receive(:limit).and_return([])

    allow(show_scope_class).to receive(:resolve).and_return(show_scope)
    allow(show_scope).to receive(:find).and_return(current_user)

    allow(index_scope_class).to receive(:resolve).and_return(index_scope)
    allow(index_scope).to receive(:offset).and_return(offset_scope)

    allow(policy_class::ShowScope).to receive(:new).with(current_user, base_scope).and_return(show_scope_class)
    allow(policy_class::IndexScope).to receive(:new).with(current_user, base_scope).and_return(index_scope_class)
  end

  def create_instance
    instance = test_class.allocate
    instance.send(:initialize, nil, graphql_context)
    instance.define_singleton_method(:tests_scope) do |base_scope:, **_args|
      base_scope
    end
    instance
  end

  describe '.react_admin_resource' do
    context 'with minimal parameters' do
      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s
        )
      end

      it 'defines a find resolver method' do
        instance = create_instance
        expect(instance).to respond_to(:Test)
      end

      it 'defines a collection resolver method' do
        instance = create_instance
        expect(instance).to respond_to(:tests)
      end

      it 'defines a meta resolver method' do
        instance = create_instance
        expect(instance).to respond_to(:tests_meta)
      end

      it 'defines a find field' do
        field = test_class.fields['Test']
        expect(field).to be_present
        expect(field.type).to eq(entity_type)
        expect(field.arguments['id']).to be_present
      end

      it 'defines a collection field' do
        field = test_class.fields['all_tests']
        expect(field).to be_present
        expect(field.type).to be_a(GraphQL::Schema::NonNull)
        expect(field.type.of_type).to be_a(GraphQL::Schema::List)
        expect(field.type.of_type.of_type.of_type).to eq(entity_type)
        expect(field.arguments['page']).to be_present
        expect(field.arguments['per_page']).to be_present
        expect(field.arguments['filter']).to be_present
      end

      it 'defines a meta field' do
        field = test_class.fields['_all_tests_meta']
        expect(field).to be_present
        expect(field.type).to eq(Groovestack::Base::GraphQL::Providers::ReactAdmin::Types::RAListMetadata)
        expect(field.arguments['page']).to be_present
        expect(field.arguments['per_page']).to be_present
        expect(field.arguments['filter']).to be_present
      end
    end

    context 'with authorization enabled' do
      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s,
          authorize: true,
          policy: policy
        )
      end

      it 'uses policy scopes for find method' do
        instance = create_instance
        instance.Test(id: 1)

        expect(policy_class::ShowScope).to have_received(:new).with(current_user, base_scope)
        expect(show_scope_class).to have_received(:resolve)
        expect(show_scope).to have_received(:find).with(1)
      end

      it 'uses policy scopes for collection method' do
        instance = create_instance
        rtn_scope = instance.tests

        expect(policy_class::IndexScope).to have_received(:new).with(current_user, base_scope)
        expect(index_scope_class).to have_received(:resolve)
        expect(rtn_scope).to eq(index_scope)
      end
    end

    context 'with visibility permission' do
      let(:visibility_permission) { :view_tests }
      let(:schema) { double('Schema', visibility_profile_for_context: [visibility_permission]) }

      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s,
          visibility_permission: visibility_permission
        )
      end

      it 'sets visibility permission on find field' do
        field = test_class.fields['Test']
        expect(field.visibility_permission).to eq(visibility_permission)
      end

      it 'sets visibility permission on collection field' do
        field = test_class.fields['all_tests']
        expect(field.visibility_permission).to eq(visibility_permission)
      end

      it 'sets visibility permission on meta field' do
        field = test_class.fields['_all_tests_meta']
        expect(field.visibility_permission).to eq(visibility_permission)
      end
    end

    context 'with camelize disabled' do
      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s,
          camelize: false
        )
      end

      it 'uses snake_case for collection field' do
        field = test_class.fields[fields[:collection].to_s]
        expect(field).to be_present
      end

      it 'uses snake_case for meta field' do
        field = test_class.fields[fields[:collection_meta].to_s]
        expect(field).to be_present
      end
    end

    context 'with camelize enabled' do
      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s,
          camelize: true
        )
      end

      def snake_to_camel(snake)
        leading_underscore = snake.start_with?('_')
        snake = snake[1..] if leading_underscore
        parts = snake.split('_')
        camel = parts[0] + parts[1..].map(&:capitalize).join
        leading_underscore ? "_#{camel}" : camel
      end

      it 'uses camelCase for collection field' do
        field = test_class.fields[snake_to_camel(fields[:collection].to_s)]
        expect(field).to be_present
      end

      it 'uses camelCase for meta field' do
        field = test_class.fields[snake_to_camel(fields[:collection_meta].to_s)]
        expect(field).to be_present
      end
    end

    context 'with pagination parameters' do
      before do
        test_class.react_admin_resource(
          entity,
          class_name: entity_class.to_s,
          graphql_type: entity_type.to_s,
          graphql_filter: entity_filter_type.to_s
        )
      end

      it 'applies pagination to collection' do
        instance = create_instance
        instance.tests(page: 1, per_page: 10)

        expect(base_scope).to have_received(:offset).with(10)
        expect(offset_scope).to have_received(:limit).with(10)
      end

      it 'handles zero-based pagination' do
        instance = create_instance
        instance.tests(page: 0, per_page: 10)

        expect(base_scope).to have_received(:offset).with(0)
        expect(offset_scope).to have_received(:limit).with(10)
      end

      it 'handles nil pagination parameters' do
        instance = create_instance
        instance.tests(page: nil, per_page: nil)

        expect(base_scope).not_to have_received(:offset)
        expect(offset_scope).not_to have_received(:limit)
      end

      it 'handles missing pagination parameters' do
        instance = create_instance
        instance.tests

        expect(base_scope).not_to have_received(:offset)
        expect(offset_scope).not_to have_received(:limit)
      end
    end

    resolver_methods.each_key do |except_method|
      context "with except parameter #{except_method}" do
        before do
          test_class.react_admin_resource(
            entity,
            class_name: entity_class.to_s,
            graphql_type: entity_type.to_s,
            graphql_filter: entity_filter_type.to_s,
            except: [except_method.to_sym]
          )
        end

        it "does not define #{except_method} method when excluded" do
          instance = create_instance
          expect(instance).not_to respond_to(resolver_methods[except_method])
        end

        it "does not define #{except_method} field when excluded" do
          expect(test_class.fields[fields[except_method].to_s]).to be_nil
        end

        resolver_methods.each_key do |method|
          next if method == except_method

          it "still defines #{method} method" do
            instance = create_instance
            expect(instance).to respond_to(resolver_methods[method])
          end

          it "still defines #{method} field" do
            expect(test_class.fields[fields[method].to_s]).to be_present
          end
        end
      end
    end
  end
end
