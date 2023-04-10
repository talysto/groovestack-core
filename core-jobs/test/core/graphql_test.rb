# See
# https://graphql-ruby.org/testing/integration_tests.html

require 'test_helper'
require 'que/active_record/model'

# NativeQueJob is a simple Job for testing
class NativeQueJob < Que::Job
  self.priority = 10 # Linux priority scale - lower runs first

  def run(param1)
    # puts "#{self.class} / #{param1}"
  end
end

module Core
  class GraphQLTest < Minitest::Test
    def test_simple_two
      assert_equal '2', '2'
    end

    def test_simple
      assert_equal 1, 1
    end

    def test_gql_query
      # it "loads jobs by ID" do
      query_string = <<-GRAPHQL
        query($id: ID!){
          node(id: $id) {
            ... on Job {
              id
            }
          }
        }
      GRAPHQL

      NativeQueJob.enqueue('one')
      NativeQueJob.enqueue('two')

      job_id = Core::Jobs::Job.first.id
      result = {} # MySchema.execute(query_string, variables: { id: job_id })

      job_result = result.dig('data', 'node')
      refute_nil job_result
      assert_equal job_id, job_result["id"]
    end
  end
end
