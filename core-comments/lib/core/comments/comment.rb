# frozen_string_literal: true

module Core
  module Comments
    class Comment < ActiveRecord::Base
      self.table_name = 'core_comments'
    end
  end
end
