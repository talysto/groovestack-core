require 'fabrication'
require 'faker'

Fabricator(:notification, class_name: 'Core::Notifications::Notification') do
  title { Faker::Lorem.sentence }
  description { Faker::Lorem.paragraph }

  from_type { |attrs| attrs[:from]&.class&.name }
  from_id { |attrs| attrs[:from]&.id }
  object_type { |attrs| attrs[:object]&.class&.name }
  object_id { |attrs| attrs[:object]&.id }

  created_at { Time.now }
  updated_at { Time.now }
end

Fabricator(:simple_notification, from: :notification, class_name: 'Core::Notifications::Simple') do
  type { 'Core::Notifications::Simple' }
  to_type { |attrs| attrs[:to]&.class&.name }
  to_id { |attrs| attrs[:to]&.id }
end

Fabricator(:task_notification, from: :simple_notification, class_name: 'Core::Notifications::Task') do
  type { 'Core::Notifications::Task' }
end

Fabricator(:global_notification, from: :notification, class_name: 'Core::Notifications::Global') do
  type { 'Core::Notifications::Global' }
end