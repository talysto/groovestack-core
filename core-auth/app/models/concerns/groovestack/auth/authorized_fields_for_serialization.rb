# frozen_string_literal: true

module Groovestack
  module Auth
    module AuthorizedFieldsForSerialization
      extend ActiveSupport::Concern

      # required for memoization during graphql serialization
      def authorized_fields_for_serialization(user)
        @authorized_fields_for_serialization ||= begin
          Pundit.policy!(user, self).permitted_attributes_for_show
        rescue StandardError => e
          # NOTE: this is a fallback for when Pundit is not available
          ::Groovestack::Base.notify_error(e)

          []
        end
      end
    end
  end
end
