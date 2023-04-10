# frozen_string_literal: true

module Core
  module Comments
    class Comment < ApplicationRecord
      self.table_name = 'core_comments'
    end
  end
end
