module Core
  module Jobs
    class DX
       def self.validate

       end
    end
  end
end

# NOTES
# List all existing migrations and status: rake db:migrate:status

# REQUIREMENTS
# 1. Application schema format must be SQL
# 2. Migration must be installed + run

steps = [
  {
    name: 'Correct schema format is SQL',
    test: { Rails.application.active_record.schema_format == :sql },
    message: 'Cannot query the jobs table, would you like add and run the migration?',
    command: 'bundle exec rails que:install'
  },

  {
    name: 'Run migrations',
    test: { Que::ActiveRecord::Model.count },
    rescuea: 'ActiveRecord::StatementInvalid',
    message: 'Cannot query the jobs table, would you like add and run the migration?',
    command: 'bundle exec rails que:install'
  }
]