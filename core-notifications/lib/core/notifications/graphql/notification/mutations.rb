# frozen_string_literal: true

module Core
  module Notifications
    module GraphQL
      module Notification
        module Mutations
          # class Create < ::Core::Base::GraphQL::BaseMutation
          #   description 'Create a notification'

          #   type ::Core::Notifications::GraphQL::Notification::Type

          #   def perform(**attrs)
          #     notification = ::Core::Notifications::Notification.create!(**attrs)
          #     notification
          #   end
          # end

          # class Delete < ::Core::Base::GraphQL::BaseMutation
          #   description 'Delete a notification'

          #   argument :id, ID, required: true, description: 'notification id'

          #   type ::Core::Notifications::GraphQL::Notification::Type

          #   def perform(id:)
          #     notification = ::Core::Notifications::Notification.find(id)
          #     notification.destroy!
          #   end
          # end

          class Update < ::Core::Base::GraphQL::BaseMutation
            description 'Update a notification'

            argument :id, ID, required: true, description: 'notification id'

            argument :instance_method, String, required: false, description: 'instance method to trigger on a notification'
            argument :instance_method_args, ::GraphQL::Types::JSON, required: false, description: 'instance method args to trigger on a notification'

            type ::Core::Notifications::GraphQL::Notification::Type

            def self.whitelisted_instance_methods
              simple = [:mark_as_read!].freeze
              task = [:mark_as_complete!].freeze
              global = [:mark_as_read!].freeze

              {
                'Core::Notifications::Simple' => simple,
                'Core::Notifications::Task' => simple + task,
                'Core::Notifications::Global' => global
              }.freeze
            end

            def perform(id:, instance_method:, instance_method_args:, **attrs)
              notification = ::Core::Notifications::Notification.find(id)
              
              if instance_method.present? 
                raise ::GraphQL::ExecutionError, "#{instance_method} is not a valid instance method for #{notification.type}" unless self.class.whitelisted_instance_methods[notification.type].include?(instance_method.to_sym)
                
                if instance_method_args.present?
                  notification.send(instance_method, **instance_method_args.symbolize_keys!)
                else
                  notification.send(instance_method)
                end
              else
                notification = notification.update!(**attrs)
              end

              notification
            end
          end

          extend ActiveSupport::Concern

          included do
            # field :create_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Create, description: 'Create a notification'
            # field :delete_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Delete, description: 'Delete a notification'
            field :update_notification, mutation: ::Core::Notifications::GraphQL::Notification::Mutations::Update, description: 'Update a notification'
          end
        end
      end
    end
  end
end
