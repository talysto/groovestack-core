# frozen_string_literal: true

module Core
  module Notifications
    class Notification < ActiveRecord::Base
      self.table_name = 'core_notifications'

      include Wisper.model if defined?(Wisper::ActiveRecord)
      
      validates :type, presence: true
      validates :title, presence: true
      validates :description, presence: true
      validates :to_type, presence: true

      belongs_to :from, polymorphic: true, optional: true
      belongs_to :object, polymorphic: true, optional: true

      # https://jbhannah.net/articles/negating-activerecord-scopes
      # NOTE: didn't work out of the box b/c of negating the type constraint
      # scope :not, ->(scope) { where(scope.arel.constraints.reduce(:and)&.not) }

      scope :search_q, ->(query) { where('title ILIKE ? OR description ILIKE ?', "%#{query}%", "%#{query}%") }

      scope :expired, -> { where.not(expire_at: nil).where('expire_at < now()') }
      scope :published, -> { where(publish_at: nil).or(where('publish_at < now()')) }
      scope :active, -> { published.where.not(id: expired) }

      scope :simple_to, ->(ids) { where(to_id: ids) } # NOTE: helper scope for main to scope below
      scope :to, ->(ids) { simple_to(ids).or(global_to(ids)) }

      # NOTE: these are intended as helper scopes for the main read & unread scopes below
      scope :simple_read, -> { where.not(read_at: nil) }
      scope :simple_unread, -> { where(read_at: nil) }
      scope :simple_read_by, -> (ids) { simple_read.where(to_id: ids) }
      scope :simple_unread_by, -> (ids) { simple_unread.where(to_id: ids) }
      scope :global_read_by, ->(ids) { global_to(ids).where('read_bloom @> ARRAY[?]::uuid[]', ids) }
      scope :global_unread_by, ->(ids) { global_to(ids).where.not('read_bloom @> ARRAY[?]::uuid[]', ids) }

      scope :read, ->(ids=nil) { 
        return simple_read unless ids.present?
         
        simple_read_by(ids).or(global_read_by(ids))
      }
      scope :unread, ->(ids=nil) { 
        return simple_unread unless ids.present?

        simple_unread_by(ids).or(global_unread_by(ids))
      }

      # NOTE: this is only relevant for task notifications
      # could move into the subclass, but this allows us to 
      # use it easily from within the graphql query
      scope :actionable, -> { where(type: 'Core::Notifications::Task').where(action_response: nil) }
      scope :completed, -> { where(type: 'Core::Notifications::Task').where.not(action_response: nil) }

      def self.global_to(to_ids)
        # NOTE: this can't be a scope b/c need to evaluate global
        # to_scope to select relevant global notifications

        # NOTE: eval is a security risk. Need to figure out how to whitelist queries / scopes stored in to_scope

        # TODO: can this be scoped better (i.e. pass in a scope, to avoid all global notification evals)

        global_ids = ::Core::Notifications::Global.select { |global| global.to_records.where(id: to_ids).present? }.map(&:id)

        where(id: global_ids)
      end

      def active?
        self.class.active.exists?(id)
      end
    end
  end
end

ActiveSupport.on_load(:after_initialize) do
  ::Core::Notifications::Notification.subscribe(::Core::Notifications::PubSub::NotificationSubscriber.new) if defined?(Wisper::ActiveRecord)
end
