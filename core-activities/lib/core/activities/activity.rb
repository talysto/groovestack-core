# frozen_string_literal: true

module Core
  module Activities
    class Activity < ActiveRecord::Base
      belongs_to :actor,  polymorphic: true
      belongs_to :object, polymorphic: true, optional: true # optional required for Rails 5
      belongs_to :target, polymorphic: true, optional: true

      scope :optimized, -> { includes(:actor, :object, :target) }
      scope :newest, -> { order(created_at: :desc) }
      scope :oldest, -> { order(created_at: :asc) }
      # default_scope { newest }

      # override this in specific activiites for human readable display
      # can be the same for all instances of an Activity, or could be
      # customized per instance and stored
      def summary
        self[:summary] || "#{actor} #{verb} #{object}".strip.squeeze(' ')
      end

      def verb
        raise NotImplementedError, 'Define verb() in your activities in order to get default summaries generated for human readability'
      end

      def humanized_type
        Activity.humanize(type)
      end

      def self.humanize(type)
        type.gsub('Activities::', '').gsub('::', ': ').underscore.titleize
      end
    end
  end
end
