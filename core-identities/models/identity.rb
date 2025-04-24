# frozen_string_literal: true

class Identity < ActiveRecord::Base
  belongs_to :user
end
