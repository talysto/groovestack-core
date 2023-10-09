module Core
  module Jobs
    class QueJobExt < ActiveRecord::Base
      self.abstract_class = true
      self.table_name = 'que_jobs_ext'
    end
  end
end