# frozen_string_literal: true

module Core
  module Notifications
    class Notification < ActiveRecord::Base
      self.table_name = 'core_notifications'
      
      validates :type, presence: true
      validates :title, presence: true
      validates :description, presence: true
      validates :to_type, presence: true

      belongs_to :from, polymorphic: true, optional: true
      belongs_to :object, polymorphic: true, optional: true

      # https://jbhannah.net/articles/negating-activerecord-scopes
      # NOTE: didn't work out of the box b/c of negating the type constraint
      # scope :not, ->(scope) { where(scope.arel.constraints.reduce(:and)&.not) }

      scope :expired, -> { where.not(expire_at: nil).where('expire_at < now()') }
      scope :published, -> { where(publish_at: nil).or(where('publish_at < now()')) }
      scope :active, -> { published.where.not(id: expired) }

      scope :simple_to, ->(id) { where(to_id: id) } # NOTE: helper scope for main to scope below
      scope :to, ->(id) { simple_to(id).or(global_to(id)) }

      # NOTE: these are intended as helper scopes for the main read & unread scopes below
      scope :simple_read, -> { where.not(read_at: nil) }
      scope :simple_unread, -> { where(read_at: nil) }
      scope :simple_read_by, -> (id) { simple_read.where(to_id: id) }
      scope :simple_unread_by, -> (id) { simple_unread.where(to_id: id) }
      scope :global_read_by, ->(id) { global_to(id).where('read_bloom @> ARRAY[?]::uuid[]', [id]) }
      scope :global_unread_by, ->(id) { global_to(id).where.not('read_bloom @> ARRAY[?]::uuid[]', [id]) }

      scope :read, ->(id=nil) { 
        return simple_read unless id.present?
         
        simple_read_by(id).or(global_read_by(id))
      }
      scope :unread, ->(id=nil) { 
        return simple_unread unless id.present?

        simple_unread_by(id).or(global_unread_by(id))
      }

      # NOTE: this is only relevant for task notifications
      # could move into the subclass, but this allows us to 
      # use it easily from within the graphql query
      scope :actionable, -> { where(type: 'Core::Notifications::Task').where(action_response: nil) }
      scope :completed, -> { where(type: 'Core::Notifications::Task').where.not(action_response: nil) }

      def self.global_to(to_id)
        # NOTE: this can't be a scope b/c need to evaluate global
        # to_scope to select relevant global notifications

        # NOTE: eval is a security risk. Need to figure out how to whitelist queries / scopes stored in to_scope

        global_ids = ::Core::Notifications::Global.select { |global| eval("#{global.to_type}.#{global.to_scope}").find_by_id(to_id).present? }.map(&:id)

        where(id: global_ids)
      end
    end
  end
end
